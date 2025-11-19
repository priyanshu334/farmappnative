"use client";

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function MarketPrices() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPrices = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("market_prices")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setPrices(data);
    } else {
      alert("❗ बाज़ार भाव लोड करने में परेशानी हुई");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPrices().then(() => setRefreshing(false));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, padding: 20, backgroundColor: "#f8fafc" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Heading */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 12,
          color: "#1e293b",
        }}
      >
        💹 आज के मंडी भाव
      </Text>
      <Text style={{ color: "#475569", marginBottom: 22, fontSize: 15 }}>
        ताज़ा बाजार रेट सीधे मंडी से 📊
      </Text>

      {/* Content */}
      {prices.map((item) => (
        <View
          key={item.id}
          style={{
            padding: 18,
            backgroundColor: "white",
            borderRadius: 12,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: "#e2e8f0",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          {/* Crop Name */}
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#1e293b" }}>
            🌾 {item.crop_name}
          </Text>

          {/* Price */}
          <Text style={{ marginTop: 6, fontSize: 16, color: "#475569" }}>
            भाव:{" "}
            <Text style={{ fontWeight: "bold", color: "#0f172a" }}>
              ₹{item.price_per_kg}/kg
            </Text>
          </Text>

          {/* Market */}
          <Text style={{ marginTop: 4, fontSize: 14, color: "#64748b" }}>
            मंडी: {item.market_name}
          </Text>

          {/* Date */}
          <Text style={{ marginTop: 6, fontSize: 12, color: "#94a3b8" }}>
            अपडेट: {String(item.created_at).substring(0, 10)}
          </Text>
        </View>
      ))}

      {prices.length === 0 && (
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            color: "#64748b",
            fontSize: 15,
          }}
        >
          ❗ कोई मंडी भाव उपलब्ध नहीं है।
        </Text>
      )}
    </ScrollView>
  );
}
