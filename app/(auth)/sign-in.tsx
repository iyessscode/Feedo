import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signInCredential } from "@/features/auth/actions";
import { signInSchema } from "@/features/auth/schemas";

export default function SignInScreen() {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const onSubmit = async () => {
    const parsed = signInSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: any = {};
      parsed.error.errors.forEach((e) => {
        fieldErrors[e.path[0]] = e.message;
      });
      setErrors(fieldErrors);

      const firstErrorField = parsed.error.errors[0].path[0];
      switch (firstErrorField) {
        case "email":
          emailRef.current?.focus();
          break;
        case "password":
          passwordRef.current?.focus();
          break;
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const result = await signInCredential(form);

    if (result.success) {
      Alert.alert("Success", `Welcome back!`);
      router.replace("/");
      setIsSubmitting(false);
    } else {
      Alert.alert("Error", result.message);
      Sentry.captureEvent(result);
    }

    setIsSubmitting(false);
  };
  return (
    <View className="mt-12 flex-col gap-y-6 px-5">
      <Input
        ref={emailRef}
        label="Email address"
        placeholder="Enter your email address"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
      />
      <Input
        ref={passwordRef}
        label="Password"
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        keyboardType="default"
        secureTextEntry={true}
      />
      <Button label="Continue" onPress={onSubmit} isLoading={isSubmitting} />

      <View className="mx-auto flex flex-row justify-center gap-x-2">
        <Text className="base-regular text-muted-foreground">
          Don&apos;t have an account?
        </Text>
        <Link href="/(auth)/sign-up" className="base-bold text-primary">
          Sign up
        </Link>
      </View>
    </View>
  );
}
