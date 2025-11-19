import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false, title: 'Home' }} />
      <Stack.Screen name="ArtistDetailsView" options={{ headerShown: false, title: 'Artist Details' }} />
    </Stack>
  );
}
