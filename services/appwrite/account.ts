import { ID } from "react-native-appwrite";

import { account } from "@/services/appwrite/client";

export async function createAccount({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    return await account.create({
      userId: ID.unique(),
      name,
      email,
      password,
    });
  } catch (error) {
    console.log("❌ @/services/appwrite/account (createAccount): ", error);

    throw error;
  }
}

export async function createSession({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    return await account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (error) {
    console.log("❌ @/services/appwrite/account (createSession): ", error);
    throw error;
  }
}

export async function getCurrentAccount() {
  try {
    return await account.get();
  } catch (error) {
    console.log("❌ @/services/appwrite/account (getCurrentAccount): ", error);
    throw error;
  }
}
