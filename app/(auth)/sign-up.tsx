import { Link, router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import { signUpSchema } from "@/features/auth/schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signUpCredential } from "@/features/auth/actions";

export default function SignUpScreen() {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const onSubmit = async () => {
    const parsed = signUpSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: any = {};
      parsed.error.errors.forEach((e) => {
        fieldErrors[e.path[0]] = e.message;
      });
      setErrors(fieldErrors);

      const firstErrorField = parsed.error.errors[0].path[0];
      switch (firstErrorField) {
        case "name":
          nameRef.current?.focus();
          break;
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

    const result = await signUpCredential(form);

    if (result.success) {
      Alert.alert("Success!", `Welcome, ${result.data.name}!`);
      router.replace("/");
      setIsSubmitting(false);
    } else {
      Alert.alert("Error", result.message);
    }

    setIsSubmitting(false);
  };
  return (
    <View className="mt-12 flex-col gap-y-6 px-5">
      <Input
        ref={nameRef}
        label="Full Name"
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, name: text }));
          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
        }}
        keyboardType="default"
        error={errors.name}
      />

      <Input
        ref={emailRef}
        label="Email address"
        placeholder="Enter your email address"
        value={form.email}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, email: text }));
          if (errors.email)
            setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        keyboardType="email-address"
        error={errors.email}
      />

      <Input
        ref={passwordRef}
        label="Password"
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, password: text }));
          if (errors.password)
            setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        keyboardType="default"
        secureTextEntry
        error={errors.password}
      />

      <Button label="Continue" onPress={onSubmit} isLoading={isSubmitting} />

      <View className="mx-auto flex flex-row justify-center gap-x-2">
        <Text className="base-regular text-muted-foreground">
          Already have an account?
        </Text>
        <Link href="/(auth)/sign-in" className="base-bold text-primary">
          Login
        </Link>
      </View>
    </View>
  );
}
