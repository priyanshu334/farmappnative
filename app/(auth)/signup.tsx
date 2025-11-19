import { Href, router } from "expo-router";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  Sprout,
  User,
} from "lucide-react-native";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return false;
    }
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
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
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
      options: {
        data: {
          name: name.trim(),
          phone: phone.trim(),
        },
      },
    });

    setIsLoading(false);

    if (error) {
      Alert.alert("Signup Failed", error.message);
      return;
    }

    Alert.alert(
      "Success!",
      "Account created successfully. Please check your email to verify your account.",
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
          {/* Logo & Title Section */}
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
                shadowColor: "#16a34a",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
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
              Create Your Account
            </Text>

            <Text
              style={{
                fontSize: 15,
                color: "#64748b",
                textAlign: "center",
              }}
            >
              Join us to start managing your farm digitally
            </Text>
          </View>

          {/* Form Section */}
          <View style={{ gap: 14 }}>
            {/* Name Input */}
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: 6,
                }}
              >
                Full Name
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
                <User size={20} color="#94a3b8" />
                <TextInput
                  placeholder="John Doe"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoComplete="name"
                  style={{
                    flex: 1,
                    padding: 14,
                    fontSize: 16,
                    color: "#0f172a",
                  }}
                />
              </View>
            </View>

            {/* Email Input */}
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

            {/* Phone Input (Optional) */}
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: 6,
                }}
              >
                Phone Number{" "}
                <Text style={{ color: "#94a3b8" }}>(Optional)</Text>
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
                <Phone size={20} color="#94a3b8" />
                <TextInput
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  style={{
                    flex: 1,
                    padding: 14,
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

            {/* Confirm Password Input */}
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#334155",
                  marginBottom: 6,
                }}
              >
                Confirm Password
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
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="password-new"
                  style={{
                    flex: 1,
                    padding: 14,
                    fontSize: 16,
                    color: "#0f172a",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#94a3b8" />
                  ) : (
                    <Eye size={20} color="#94a3b8" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms & Conditions */}
            <Text
              style={{
                fontSize: 12,
                color: "#64748b",
                textAlign: "center",
                lineHeight: 18,
                marginTop: 4,
              }}
            >
              By signing up, you agree to our{" "}
              <Text style={{ color: "#16a34a", fontWeight: "600" }}>
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text style={{ color: "#16a34a", fontWeight: "600" }}>
                Privacy Policy
              </Text>
            </Text>

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
                marginTop: 8,
                shadowColor: "#16a34a",
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
                  Create Account
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
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
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
