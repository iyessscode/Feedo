import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  return (
    <SafeAreaView>
      <Text>Sign Up Screen</Text>
      <View className="flex flex-row items-center justify-center gap-x-2">
        <Text>Already have an account?</Text>
        <Link href="/(auth)/sign-in" className="text-primary">
          Sign In
        </Link>
      </View>
    </SafeAreaView>
  );
}
