import { Href, router } from "expo-router";
import { Eye, EyeOff, Lock, Mail, Sprout } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsLoading(false);

    if (error) {
      Alert.alert("Login Failed", error.message);
      return;
    }

    router.replace("/(tabs)" as Href);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#F3F7ED" }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            padding: 22,
            justifyContent: "center",
            maxWidth: 420,
            width: "100%",
            alignSelf: "center",
          }}
        >
          {/* Logo & Title */}
          <View style={{ alignItems: "center", marginBottom: 40 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#3B7D2A",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              {" "}
              <Sprout size={38} color="#ffffff" strokeWidth={2.5} />{" "}
            </View>
            ```
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#1B3C1A",
                marginBottom: 6,
              }}
            >
              Welcome Back
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#4A6040",
                textAlign: "center",
              }}
            >
              Sign in to manage your farm
            </Text>
          </View>

          {/* Form */}
          <View style={{ gap: 16 }}>
            {/* Email */}
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#355734",
                  marginBottom: 6,
                }}
              >
                Email Address
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#C2D3B4",
                  borderRadius: 10,
                  backgroundColor: "#ffffff",
                  paddingHorizontal: 14,
                }}
              >
                <Mail size={20} color="#89A37D" />
                <TextInput
                  placeholder="your.email@example.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    fontSize: 15,
                    color: "#1B3C1A",
                  }}
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#355734",
                  marginBottom: 6,
                }}
              >
                Password
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#C2D3B4",
                  borderRadius: 10,
                  backgroundColor: "#ffffff",
                  paddingHorizontal: 14,
                }}
              >
                <Lock size={20} color="#89A37D" />
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    fontSize: 15,
                    color: "#1B3C1A",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#89A37D" />
                  ) : (
                    <Eye size={20} color="#89A37D" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={{ alignSelf: "flex-end" }}>
              <Text
                style={{
                  color: "#3B7D2A",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={login}
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? "#8CA380" : "#3B7D2A",
                padding: 15,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 4,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 26,
              gap: 4,
            }}
          >
            <Text style={{ color: "#4A6040", fontSize: 14 }}>
              Dont have an account?
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/signup" as Href)}
            >
              <Text
                style={{
                  color: "#3B7D2A",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
