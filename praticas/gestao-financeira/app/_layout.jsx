import { Stack, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider, { AuthContext } from "../contexts/AuthContext";
import GlobalState from "../contexts/GlobalState";

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
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
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
