import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  return (
    <SafeAreaView>
      <Text>SignInScreen</Text>
      <View className="flex flex-row items-center justify-center gap-x-2">
        <Text>Don&apos;t have an account?</Text>
        <Link href="/(auth)/sign-up" className="text-primary">
          Sign Up
        </Link>
      </View>
    </SafeAreaView>
  );
}
