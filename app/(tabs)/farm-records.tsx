"use client";

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

export default function FarmRecords() {
  const [records, setRecords] = useState<any[]>([]);
  const [crops, setCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Form fields
  const [cropId, setCropId] = useState("");
  const [land, setLand] = useState("");
  const [inputCost, setInputCost] = useState("");
  const [yieldKg, setYieldKg] = useState("");
  const [marketPrice, setMarketPrice] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);

  // Fetch crops + records
  const fetchData = async () => {
    setLoading(true);

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { data: cropList } = await supabase.from("crops").select("*");

    const { data: farmList } = await supabase
      .from("farm_records")
      .select("*, crops(name)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setCrops(cropList || []);
    setRecords(farmList || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  };

  const calculateRevenueProfit = () => {
    const rev = Number(yieldKg) * Number(marketPrice);
    const prof = rev - Number(inputCost);

    setRevenue(rev);
    setProfit(prof);
  };

  const handleAddRecord = async () => {
    if (!cropId || !land || !inputCost || !yieldKg) {
      return alert("Please fill all fields");
    }

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { error } = await supabase.from("farm_records").insert({
      user_id: user.id,
      crop_id: cropId,
      land_area: Number(land),
      input_cost: Number(inputCost),
      yield: Number(yieldKg),
      revenue,
      profit,
      season: "Current",
    });

    if (error) {
      alert("Failed to add record");
    } else {
      alert("Record added successfully!");
      setAdding(false);
      fetchData();
    }
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );

  return (
    <ScrollView
      style={{ flex: 1, padding: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        📘 Farm Records
      </Text>

      {/* Add New Record Button */}
      <TouchableOpacity
        onPress={() => setAdding(!adding)}
        style={{
          backgroundColor: adding ? "#ef4444" : "#2563eb",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          {adding ? "Cancel" : "+ Add New Record"}
        </Text>
      </TouchableOpacity>

      {/* Add Form */}
      {adding && (
        <View
          style={{
            padding: 20,
            backgroundColor: "white",
            borderRadius: 12,
            elevation: 3,
            marginBottom: 25,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10 }}>
            Add Farm Record
          </Text>

          {/* Crop */}
          <Text style={{ marginBottom: 6 }}>Crop *</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 15 }}
          >
            {crops.map((c) => (
              <TouchableOpacity
                key={c.id}
                onPress={() => setCropId(c.id)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  backgroundColor: cropId === c.id ? "#2563eb" : "#e2e8f0",
                  borderRadius: 8,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: cropId === c.id ? "white" : "black" }}>
                  {c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text>Land Area (Acres) *</Text>
          <TextInput
            placeholder="e.g. 2.5"
            keyboardType="numeric"
            value={land}
            onChangeText={setLand}
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
            }}
          />

          <Text>Input Cost (₹) *</Text>
          <TextInput
            placeholder="Enter cost"
            keyboardType="numeric"
            value={inputCost}
            onChangeText={setInputCost}
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
            }}
          />

          <Text>Yield (kg) *</Text>
          <TextInput
            placeholder="Enter yield"
            keyboardType="numeric"
            value={yieldKg}
            onChangeText={setYieldKg}
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
            }}
          />

          {/* Market Price */}
          <Text>Market Price (₹ per kg)</Text>
          <TextInput
            placeholder="Optional"
            keyboardType="numeric"
            value={String(marketPrice)}
            onChangeText={(v) => setMarketPrice(Number(v))}
            onBlur={calculateRevenueProfit}
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
            }}
          />

          <Text style={{ marginTop: 10 }}>Revenue: ₹{revenue}</Text>
          <Text>Profit: ₹{profit}</Text>

          <TouchableOpacity
            onPress={handleAddRecord}
            style={{
              backgroundColor: "#16a34a",
              padding: 14,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Save Record</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Records List */}
      {records.map((r) => (
        <View
          key={r.id}
          style={{
            padding: 18,
            backgroundColor: "white",
            borderRadius: 12,
            elevation: 3,
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {r.crops?.name}
          </Text>

          <Text style={{ marginTop: 6 }}>Land: {r.land_area} acres</Text>
          <Text>Yield: {r.yield} kg</Text>
          <Text>Input Cost: ₹{r.input_cost}</Text>
          <Text>Revenue: ₹{r.revenue}</Text>

          <Text
            style={{
              marginTop: 6,
              fontWeight: "600",
              color: r.profit >= 0 ? "#16a34a" : "#dc2626",
            }}
          >
            Profit: ₹{r.profit}
          </Text>

          <Text style={{ marginTop: 6, color: "gray" }}>
            {String(r.created_at).substring(0, 10)}
          </Text>
        </View>
      ))}

      {records.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20, color: "gray" }}>
          No farm records found.
        </Text>
      )}
    </ScrollView>
  );
}
