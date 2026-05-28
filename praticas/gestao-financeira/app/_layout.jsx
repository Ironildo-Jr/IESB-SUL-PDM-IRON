import { Stack, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import Constants from "expo-constants";

// Dev helper: try to auto-set a reachable BASE_URL for device testing.
// It attempts to extract the packager host IP (debuggerHost) and use port 3000.
// If it cannot detect an IP, it leaves global.__BASE_URL__ unchanged so you can
// set it manually (for example with localtunnel/ngrok or your machine IP).
try {
  if (typeof global !== "undefined" && !global.__BASE_URL__) {
    const dbg = (Constants.manifest && Constants.manifest.debuggerHost) || (Constants.expoConfig && Constants.expoConfig.debuggerHost) || null;
    if (dbg) {
      const ip = String(dbg).split(":")[0];
      if (ip && ip !== "") {
        global.__BASE_URL__ = `http://${ip}:3000`;
        // eslint-disable-next-line no-console
        console.log("[dev] auto-set global.__BASE_URL__ ->", global.__BASE_URL__);
      }
    }
  }
} catch (e) {}
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
