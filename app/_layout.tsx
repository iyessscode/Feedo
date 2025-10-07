import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "./globals.css";

Sentry.init({
  dsn: "https://2b416eaa087bc613e9e90ad6297085be@o4510150607568896.ingest.us.sentry.io/4510150621134848",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

SplashScreen.preventAutoHideAsync();

export default Sentry.wrap(function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  const [loaded, error] = useFonts({
    QuicksandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
    QuicksandSemibold: require("../assets/fonts/Quicksand-SemiBold.ttf"),
    QuicksandMedium: require("../assets/fonts/Quicksand-Medium.ttf"),
    QuicksandRegular: require("../assets/fonts/Quicksand-Regular.ttf"),
    QuicksandLight: require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  if ((!loaded && !error) || isLoading) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
});
