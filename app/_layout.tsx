import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen
          name="home"
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="ArtistDetailsView"
          options={{ headerShown: false, title: "Artist Details" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
