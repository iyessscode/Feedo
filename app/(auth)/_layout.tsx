import { Redirect, Slot } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getCurrentUser } from "@/features/auth/actions";
import useAuthStore from "@/store/auth.store";
import { useEffect } from "react";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Redirect href="/" />;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await getCurrentUser();
    };

    fetchCurrentUser();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="bg-background h-full"
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="relative w-full"
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className="size-full rounded-b-lg"
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            className="absolute -bottom-16 z-10 size-48 self-center"
          />
        </View>
        <SafeAreaView>
          <Slot />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
