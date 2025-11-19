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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!scheme)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No scheme found.</Text>
      </View>
    );

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>{scheme.title}</Text>

      <Text style={{ marginTop: 10, fontSize: 16, lineHeight: 22 }}>
        {scheme.description}
      </Text>

      {scheme.benefits && (
        <>
          <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "700" }}>
            Benefits:
          </Text>
          <Text style={{ marginTop: 6, fontSize: 16, lineHeight: 22 }}>
            {scheme.benefits}
          </Text>
        </>
      )}

      {scheme.eligibility && (
        <>
          <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "700" }}>
            Eligibility:
          </Text>
          <Text style={{ marginTop: 6, fontSize: 16, lineHeight: 22 }}>
            {scheme.eligibility}
          </Text>
        </>
      )}

      {scheme.apply_link && (
        <Text
          style={{
            marginTop: 20,
            fontSize: 16,
            color: "#2563eb",
            textDecorationLine: "underline",
          }}
          onPress={() => Linking.openURL(scheme.apply_link)}
        >
          Apply Online →
        </Text>
      )}
    </ScrollView>
  );
}
