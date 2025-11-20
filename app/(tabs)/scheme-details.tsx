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
      .eq("id", Number(id))
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

  if (!scheme) {
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
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#FCF7E9",
      }}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: "#E7C873",
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
          borderColor: "#D1B564",
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "800",
            color: "#4a3b15",
            textAlign: "center",
          }}
        >
          {scheme.title}
        </Text>
      </View>

      {/* Auto-render all fields */}
      <View
        style={{
          backgroundColor: "#FFFBEF",
          padding: 16,
          borderRadius: 12,
          borderColor: "#E0D8BD",
          borderWidth: 1,
        }}
      >
        {Object.entries(scheme).map(([key, value]) => {
          if (!value || key === "id") return null;

          return (
            <View key={key} style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#3b2f0b",
                  marginBottom: 6,
                  textTransform: "capitalize",
                }}
              >
                {key.replace(/_/g, " ")}:
              </Text>

              {/* If value is a link */}
              {key.toLowerCase().includes("link") ? (
                <Text
                  style={{
                    fontSize: 16,
                    color: "#6B8E23",
                    textDecorationLine: "underline",
                  }}
                  onPress={() => Linking.openURL(String(value))}
                >
                  Open Link →
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    color: "#5c4a1d",
                    lineHeight: 22,
                  }}
                >
                  {String(value)}
                </Text>
              )}
            </View>
          );
        })}
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
