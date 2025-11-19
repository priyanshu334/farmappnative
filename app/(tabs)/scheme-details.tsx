"use client";

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function SchemeDetails() {
  const { id } = useLocalSearchParams();
  const [scheme, setScheme] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    const { data, error } = await supabase
      .from("schemes")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) setScheme(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fdf8e8",
        }}
      >
        <ActivityIndicator size="large" color="#6B8E23" />
      </View>
    );
  }

  if (!scheme)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fdf8e8",
        }}
      >
        <Text style={{ color: "#6b6b6b", fontSize: 16 }}>योजना नहीं मिली।</Text>
      </View>
    );

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#fdf8e8",
      }}
    >
      {/* Title */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "800",
          color: "#4a3b15",
          marginBottom: 10,
        }}
      >
        {scheme.title}
      </Text>

      {/* Description */}
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          lineHeight: 24,
          color: "#5c4a1d",
        }}
      >
        {scheme.description}
      </Text>

      {/* Benefits */}
      {scheme.benefits && (
        <View style={{ marginTop: 25 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#3b2f0b",
              marginBottom: 8,
            }}
          >
            लाभ (Benefits):
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#5c4a1d",
              lineHeight: 24,
            }}
          >
            {scheme.benefits}
          </Text>
        </View>
      )}

      {/* Eligibility */}
      {scheme.eligibility && (
        <View style={{ marginTop: 25 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#3b2f0b",
              marginBottom: 8,
            }}
          >
            पात्रता (Eligibility):
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#5c4a1d",
              lineHeight: 24,
            }}
          >
            {scheme.eligibility}
          </Text>
        </View>
      )}

      {/* Apply Link */}
      {scheme.apply_link && (
        <Text
          style={{
            marginTop: 30,
            fontSize: 17,
            fontWeight: "600",
            color: "#6B8E23",
            textDecorationLine: "underline",
          }}
          onPress={() => Linking.openURL(scheme.apply_link)}
        >
          ऑनलाइन आवेदन करें →
        </Text>
      )}
    </ScrollView>
  );
}
