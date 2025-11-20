"use client";

import { Href, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const fetchSchemes = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("schemes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setSchemes(data);
    } else {
      alert("योजनाएँ लोड नहीं हो सकीं");
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

  const filteredSchemes = schemes.filter(
    (s) =>
      s.title?.toLowerCase().includes(search.toLowerCase()) ||
      s.short_description?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {" "}
        <ActivityIndicator size="large" color="#6B8E23" />{" "}
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#fdf8e8", // warm crop field tone
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Heading */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "800",
          marginBottom: 15,
          color: "#4a3b15",
        }}
      >
        🌾 सरकारी योजनाएँ{" "}
      </Text>
      ```
      {/* Search Bar */}
      <TextInput
        placeholder="योजना खोजें..."
        placeholderTextColor="#8f866e"
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "#d2c7a4",
          fontSize: 16,
        }}
      />
      {/* Schemes List */}
      {filteredSchemes.map((s) => (
        <TouchableOpacity
          key={s.id}
          onPress={() => router.push(`/scheme-details?id=${s.id}` as Href)}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 16,
            padding: 18,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: "#d2c7a4",
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 5,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#3b2f0b",
            }}
          >
            {s.title}
          </Text>

          <Text
            style={{
              marginTop: 6,
              color: "#766f61",
              fontSize: 15,
            }}
          >
            {s.short_description}
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 15,
              fontWeight: "600",
              color: "#6B8E23",
            }}
          >
            विस्तार से देखें →
          </Text>
        </TouchableOpacity>
      ))}
      {/* Empty State */}
      {filteredSchemes.length === 0 && (
        <Text
          style={{
            marginTop: 40,
            textAlign: "center",
            color: "#6b6b6b",
            fontSize: 16,
          }}
        >
          कोई मिलती-जुलती योजना नहीं मिली।
        </Text>
      )}
    </ScrollView>
  );
}
