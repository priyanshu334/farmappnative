import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync(); // 👈 stops splash from closing automatically

export default function Splash() {
  const fadeAnim = new Animated.Value(15);

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      SplashScreen.hideAsync();

      router.replace("/"); // 👈 change to /home or /(tabs)
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/splash.jpeg")}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 240,
    height: 240,
  },
});
