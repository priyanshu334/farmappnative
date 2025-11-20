import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="login_with_otp" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
