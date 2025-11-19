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
      style={{ flex: 1, backgroundColor: "#f8fafc" }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            flex: 1,
            padding: 24,
            justifyContent: "center",
            maxWidth: 440,
            width: "100%",
            alignSelf: "center",
          }}
        >
          {/* Logo & Title Section */}
          <View style={{ alignItems: "center", marginBottom: 48 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#2563eb",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                shadowColor: "#2563eb",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Sprout size={40} color="#ffffff" strokeWidth={2.5} />
            </View>

            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              Welcome Back
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#64748b",
                textAlign: "center",
              }}
            >
              Sign in to manage your farm
            </Text>
          </View>

          {/* Form Section */}
          <View style={{ gap: 16 }}>
            {/* Email Input */}
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: 8,
                }}
              >
                Email Address
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#e2e8f0",
                  borderRadius: 12,
                  backgroundColor: "#ffffff",
                  paddingHorizontal: 16,
                }}
              >
                <Mail size={20} color="#94a3b8" />
                <TextInput
                  placeholder="your.email@example.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                  style={{
                    flex: 1,
                    padding: 16,
                    fontSize: 16,
                    color: "#0f172a",
                  }}
                />
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: 8,
                }}
              >
                Password
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#e2e8f0",
                  borderRadius: 12,
                  backgroundColor: "#ffffff",
                  paddingHorizontal: 16,
                }}
              >
                <Lock size={20} color="#94a3b8" />
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  style={{
                    flex: 1,
                    padding: 16,
                    fontSize: 16,
                    color: "#0f172a",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#94a3b8" />
                  ) : (
                    <Eye size={20} color="#94a3b8" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  color: "#2563eb",
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
              activeOpacity={0.8}
              style={{
                backgroundColor: isLoading ? "#94a3b8" : "#2563eb",
                padding: 18,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 8,
                shadowColor: "#2563eb",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
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
              marginTop: 32,
              gap: 4,
            }}
          >
            <Text style={{ color: "#64748b", fontSize: 14 }}>
              Dont have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/(auth)/signup" as Href)}
            >
              <Text
                style={{
                  color: "#2563eb",
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
