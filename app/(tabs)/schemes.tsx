"use client";

import { Href, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSchemes = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("schemes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setSchemes(data);
    } else {
      alert("Failed to fetch schemes");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSchemes().then(() => setRefreshing(false));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, padding: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        🏛 Government Schemes
      </Text>

      {schemes.map((s) => (
        <TouchableOpacity
          key={s.id}
          onPress={() => router.push(`/scheme-details?id=${s.id}` as Href)}
          style={{
            padding: 18,
            backgroundColor: "white",
            elevation: 3,
            borderRadius: 12,
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>{s.title}</Text>

          <Text style={{ marginTop: 6, color: "gray" }}>
            {s.short_description}
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              fontWeight: "500",
              color: "#2563eb",
            }}
          >
            View Details →
          </Text>
        </TouchableOpacity>
      ))}

      {schemes.length === 0 && (
        <Text style={{ marginTop: 20, textAlign: "center", color: "gray" }}>
          No schemes found.
        </Text>
      )}
    </ScrollView>
  );
}
