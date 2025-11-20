"use client";

import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function OtpLoginScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // SEND OTP FUNCTION
  const sendOtp = async () => {
    if (!phone) return Alert.alert("Please enter phone");

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ phone });

    setLoading(false);

    if (error) return Alert.alert("Error", error.message);

    setIsOtpSent(true);
    Alert.alert("OTP sent!", "Check your SMS");
  };

  // VERIFY OTP FUNCTION
  const verifyOtp = async () => {
    if (!otp) return Alert.alert("Enter OTP");

    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    });

    setLoading(false);

    if (error) return Alert.alert("Error", error.message);

    Alert.alert("Login Successful!");
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      {!isOtpSent ? (
        <>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Login with Phone
          </Text>

          <TextInput
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={{
              borderWidth: 1,
              padding: 12,
              marginTop: 20,
              borderRadius: 8,
            }}
          />

          <TouchableOpacity
            onPress={sendOtp}
            style={{
              backgroundColor: "#1E90FF",
              padding: 14,
              borderRadius: 8,
              marginTop: 20,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Send OTP
              </Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Enter OTP</Text>

          <TextInput
            placeholder="123456"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            style={{
              borderWidth: 1,
              padding: 12,
              marginTop: 20,
              borderRadius: 8,
            }}
          />

          <TouchableOpacity
            onPress={verifyOtp}
            style={{
              backgroundColor: "#28A745",
              padding: 14,
              borderRadius: 8,
              marginTop: 20,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Verify & Login
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
