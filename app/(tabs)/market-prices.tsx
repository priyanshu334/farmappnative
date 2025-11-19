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
      alert("Failed to load market prices");
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
        💹 Market Prices Today
      </Text>

      {prices.map((item) => (
        <View
          key={item.id}
          style={{
            padding: 18,
            backgroundColor: "white",
            elevation: 3,
            borderRadius: 12,
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {item.crop_name}
          </Text>

          <Text style={{ marginTop: 4, fontSize: 16 }}>
            Price:{" "}
            <Text style={{ fontWeight: "bold" }}>₹{item.price_per_kg}/kg</Text>
          </Text>

          <Text style={{ marginTop: 2, fontSize: 14, color: "gray" }}>
            Market: {item.market_name}
          </Text>

          <Text style={{ marginTop: 4, fontSize: 13, color: "gray" }}>
            Updated: {String(item.created_at).substring(0, 10)}
          </Text>
        </View>
      ))}

      {prices.length === 0 && (
        <Text style={{ marginTop: 20, textAlign: "center", color: "gray" }}>
          No market prices found.
        </Text>
      )}
    </ScrollView>
  );
}
