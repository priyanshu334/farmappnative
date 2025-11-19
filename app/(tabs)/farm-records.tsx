// app/(tabs)/farm-records.tsx
"use client";

import { Calendar, IndianRupee, Leaf, Plus, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";

type FarmRecord = {
  id: string;
  crop_id: string;
  land_area: number;
  input_cost: number;
  yield: number;
  revenue: number;
  profit: number;
  created_at: string;
  crops: { name: string };
};

export default function FarmRecords() {
  const [records, setRecords] = useState<FarmRecord[]>([]);
  const [crops, setCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [adding, setAdding] = useState(false);

  // Form states
  const [cropId, setCropId] = useState("");
  const [land, setLand] = useState("");
  const [inputCost, setInputCost] = useState("");
  const [yieldKg, setYieldKg] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const calculateProfit = () => {
    const cost = Number(inputCost) || 0;
    const yieldAmount = Number(yieldKg) || 0;
    const price = Number(marketPrice) || 0;
    const rev = yieldAmount * price;
    const prof = rev - cost;
    setRevenue(rev);
    setProfit(prof);
  };

  const handleAddRecord = async () => {
    if (!cropId || !land || !inputCost || !yieldKg) {
      Alert.alert("Missing Fields", "Please fill all required fields");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("farm_records").insert({
      user_id: user.id,
      crop_id: cropId,
      land_area: Number(land),
      input_cost: Number(inputCost),
      yield: Number(yieldKg),
      revenue,
      profit,
      season: new Date().getFullYear().toString(),
    });

    if (error) {
      Alert.alert("Error", "Failed to save record. Try again.");
    } else {
      Alert.alert("Success", "Farm record added successfully!");
      setAdding(false);
      resetForm();
      fetchData();
    }
  };

  const resetForm = () => {
    setCropId("");
    setLand("");
    setInputCost("");
    setYieldKg("");
    setMarketPrice("");
    setRevenue(0);
    setProfit(0);
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#f8fafc",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={{ marginTop: 16, fontSize: 16, color: "#64748b" }}>
          Loading your farm records...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0fdf4" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View
          style={{ backgroundColor: "#16a34a", padding: 20, paddingTop: 10 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Leaf size={32} color="white" />
            <View>
              <Text style={{ fontSize: 24, fontWeight: "800", color: "white" }}>
                मेरे खेत के रिकॉर्ड
              </Text>
              <Text style={{ color: "#dcfce7", fontSize: 15 }}>
                सभी फसलों का हिसाब-किताब
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#16a34a"]}
            />
          }
          style={{ flex: 1, padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Add Button */}
          <TouchableOpacity
            onPress={() => setAdding(!adding)}
            style={{
              backgroundColor: adding ? "#dc2626" : "#15803d",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              borderRadius: 16,
              gap: 10,
              marginBottom: 20,
              elevation: 4,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            {adding ? (
              <X size={24} color="white" />
            ) : (
              <Plus size={24} color="white" />
            )}
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              {adding ? "Cancel" : "नया रिकॉर्ड जोड़ें"}
            </Text>
          </TouchableOpacity>

          {/* Add Form */}
          {adding && (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: 20,
                marginBottom: 24,
                elevation: 6,
                shadowColor: "#000",
                shadowOpacity: 0.12,
                shadowRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#166534",
                  marginBottom: 16,
                }}
              >
                नई फसल का रिकॉर्ड
              </Text>

              {/* Crop Selection */}
              <Text
                style={{ fontWeight: "600", marginBottom: 8, color: "#374151" }}
              >
                फसल चुनें
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 16 }}
              >
                {crops.map((crop) => (
                  <TouchableOpacity
                    key={crop.id}
                    onPress={() => setCropId(crop.id)}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      backgroundColor:
                        cropId === crop.id ? "#16a34a" : "#f1f5f9",
                      borderRadius: 30,
                      marginRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: cropId === crop.id ? "white" : "#374151",
                        fontWeight: "600",
                      }}
                    >
                      {crop.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TextInput
                placeholder="जमीन (एकड़ में)"
                keyboardType="numeric"
                value={land}
                onChangeText={setLand}
                style={styles.input}
              />
              <TextInput
                placeholder="खर्चा (₹)"
                keyboardType="numeric"
                value={inputCost}
                onChangeText={setInputCost}
                style={styles.input}
              />
              <TextInput
                placeholder="उत्पादन (किलो में)"
                keyboardType="numeric"
                value={yieldKg}
                onChangeText={setYieldKg}
                style={styles.input}
              />
              <TextInput
                placeholder="बाजार भाव (₹ प्रति किलो) - वैकल्पिक"
                keyboardType="numeric"
                value={marketPrice}
                onChangeText={setMarketPrice}
                onBlur={calculateProfit}
                style={styles.input}
              />

              {/* Results */}
              <View
                style={{
                  backgroundColor: "#f0fdf4",
                  padding: 16,
                  borderRadius: 12,
                  marginTop: 12,
                }}
              >
                <Text style={{ fontSize: 16, color: "#166534" }}>
                  <IndianRupee size={18} color="#166534" /> कुल आय: ₹
                  {revenue.toLocaleString("en-IN")}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: profit >= 0 ? "#16a34a" : "#dc2626",
                    marginTop: 8,
                  }}
                >
                  {profit >= 0 ? "लाभ" : "नुकसान"}: ₹
                  {Math.abs(profit).toLocaleString("en-IN")}
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleAddRecord}
                style={{
                  backgroundColor: "#16a34a",
                  padding: 16,
                  borderRadius: 16,
                  alignItems: "center",
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Leaf size={22} color="white" />
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "600" }}
                >
                  रिकॉर्ड सेव करें
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Records List */}
          {records.length === 0 ? (
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text style={{ fontSize: 18, color: "#94a3b8" }}>
                कोई रिकॉर्ड नहीं मिला
              </Text>
              <Text style={{ color: "#94a3b8", marginTop: 8 }}>
                ऊपर बटन दबाकर नया रिकॉर्ड जोड़ें
              </Text>
            </View>
          ) : (
            records.map((r) => (
              <View
                key={r.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: 18,
                  padding: 18,
                  marginBottom: 16,
                  elevation: 4,
                  shadowColor: "#000",
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "800",
                      color: "#166534",
                    }}
                  >
                    {r.crops?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: r.profit >= 0 ? "#16a34a" : "#dc2626",
                    }}
                  >
                    ₹{Math.abs(r.profit).toLocaleString("en-IN")}{" "}
                    {r.profit >= 0 ? "लाभ" : "नुकसान"}
                  </Text>
                </View>

                <View style={{ marginTop: 12, gap: 6 }}>
                  <Text style={{ color: "#475569" }}>
                    जमीन: {r.land_area} एकड़
                  </Text>
                  <Text style={{ color: "#475569" }}>
                    उत्पादन: {r.yield} किलो
                  </Text>
                  <Text style={{ color: "#475569" }}>
                    खर्च: ₹{r.input_cost.toLocaleString("en-IN")}
                  </Text>
                  <Text style={{ color: "#475569" }}>
                    आय: ₹{r.revenue.toLocaleString("en-IN")}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 12,
                    gap: 6,
                  }}
                >
                  <Calendar size={16} color="#94a3b8" />
                  <Text style={{ color: "#94a3b8", fontSize: 13 }}>
                    {new Date(r.created_at).toLocaleDateString("hi-IN")}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Reusable input style
const styles = {
  input: {
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fdfdfe",
    marginBottom: 12,
  },
};
