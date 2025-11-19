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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const signup = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setIsLoading(false);

    if (error) {
      Alert.alert("Signup Failed", error.message);
      return;
    }

    Alert.alert(
      "Success!",
      "Account created successfully. Please verify your email.",
      [{ text: "OK", onPress: () => router.replace("/(tabs)" as Href) }]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#f8fafc" }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            padding: 24,
            paddingTop: 60,
            maxWidth: 440,
            width: "100%",
            alignSelf: "center",
          }}
        >
          {/* Logo & Title */}
          <View style={{ alignItems: "center", marginBottom: 40 }}>
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: "#16a34a",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Sprout size={36} color="#ffffff" strokeWidth={2.5} />
            </View>

            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#0f172a",
                marginBottom: 6,
              }}
            >
              Create Account
            </Text>
          </View>

          {/* Form */}
          <View style={{ gap: 14 }}>
            {/* Email */}
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: 6,
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
                    padding: 14,
                    fontSize: 16,
                    color: "#0f172a",
                  }}
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: 6,
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
                  placeholder="Min. 6 characters"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password-new"
                  style={{
                    flex: 1,
                    padding: 14,
                    fontSize: 16,
                    color: "#0f172a",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#94a3b8" />
                  ) : (
                    <Eye size={20} color="#94a3b8" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              onPress={signup}
              disabled={isLoading}
              activeOpacity={0.8}
              style={{
                backgroundColor: isLoading ? "#94a3b8" : "#16a34a",
                padding: 18,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 10,
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
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 24,
              marginBottom: 20,
              gap: 4,
            }}
          >
            <Text style={{ color: "#64748b", fontSize: 14 }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
              <Text
                style={{
                  color: "#16a34a",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
