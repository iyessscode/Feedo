import { AppwriteException, ID, Models, Query } from "react-native-appwrite";
import z from "zod";

import { signInSchema, signUpSchema } from "@/features/auth/schemas";

import {
  createAccount,
  createSession,
  getCurrentAccount,
} from "@/services/appwrite/account";
import { appwriteConfig, avatar, db } from "@/services/appwrite/client";

export async function signUpCredential(
  unsafeData: z.infer<typeof signUpSchema>,
): Promise<
  | { success: false; message: string }
  | { success: true; data: Models.DefaultRow }
> {
  const parsed = signUpSchema.safeParse(unsafeData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid field",
    };
  }

  const { name, email, password } = parsed.data;

  try {
    const newAccount = await createAccount({ name, email, password });
    const avatarImage = avatar.getInitialsURL(name);

    const newUser = await db.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: "users",
      rowId: ID.unique(),
      data: {
        name,
        email,
        avatar: avatarImage,
        account_id: newAccount.$id,
      },
    });

    return {
      success: true,
      data: newUser,
    };
  } catch (error) {
    console.log("❌ @/services/appwrite/auth-action (signUpSchema): ", error);

    if (error instanceof AppwriteException) {
      if (error.type === "user_already_exists") {
        return {
          success: false,
          message: `Email "${email}" already been used. Please use another email`,
        };
      }
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message:
        "An unexpected error occurred during sign in. Please try again later.",
    };
  }
}

export async function signInCredential(
  unsafeData: z.infer<typeof signInSchema>,
): Promise<
  { success: false; message: string } | { success: true; data: Models.Session }
> {
  const parsed = signInSchema.safeParse(unsafeData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid Fields",
    };
  }

  try {
    const session = await createSession(parsed.data);

    return {
      success: true,
      data: session,
    };
  } catch (error) {
    console.log(
      "❌ @/services/appwrite/auth-action (signInCredential): ",
      error,
    );

    if (error instanceof AppwriteException) {
      return {
        success: false,
        message: error.message,
      };
    }

    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return {
      success: false,
      message:
        "An unexpected error occurred during sign up. Please try again later.",
    };
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getCurrentAccount();

    if (!currentAccount) return null;

    const currentUser = await db.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: "users",
      queries: [Query.equal("account_id", currentAccount.$id)],
    });

    if (!currentUser) return null;

    return currentUser.rows[0];
  } catch (error) {
    console.log("❌ @/services/appwrite/auth-action (getCurrentUser): ", error);

    return null;
  }
}
