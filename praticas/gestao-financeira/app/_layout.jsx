import { useContext, useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../constants/colors";
import GlobalState from "../contexts/GlobalState";
import AuthProvider, { AuthContext } from "../contexts/AuthContext";

function RootLayoutContent() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isHydrated) return;

    if (!auth.user) {
      router.replace("/login");
    } else {
      router.replace("/(tabs)");
    }
  }, [auth.user, auth.isHydrated]);

  if (!auth.isHydrated) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <GlobalState>
        <RootLayoutContent />
      </GlobalState>
    </AuthProvider>
  );
}
