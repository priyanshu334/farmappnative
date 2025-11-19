"use client";

import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CropRecommendation() {
  const [soil, setSoil] = useState("");
  const [water, setWater] = useState("");
  const [land, setLand] = useState("");
  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleRecommend = async () => {
    if (!soil || !water || !land) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://YOUR_BACKEND_DOMAIN/api/recommendation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            soil,
            water,
            land,
            temperature,
            rainfall,
          }),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        🌾 AI Crop Recommendation
      </Text>

      {/* Soil Type */}
      <Text style={{ marginBottom: 6, fontWeight: "600" }}>Soil Type *</Text>
      <TextInput
        placeholder="Black, Red, Clay, Sandy"
        value={soil}
        onChangeText={setSoil}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      {/* Water Availability */}
      <Text style={{ marginBottom: 6, fontWeight: "600" }}>
        Water Availability *
      </Text>
      <TextInput
        placeholder="Low / Medium / High"
        value={water}
        onChangeText={setWater}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      {/* Land Area */}
      <Text style={{ marginBottom: 6, fontWeight: "600" }}>
        Land Area (Acres) *
      </Text>
      <TextInput
        placeholder="e.g. 2.5"
        value={land}
        onChangeText={setLand}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      {/* Temperature */}
      <Text style={{ marginBottom: 6, fontWeight: "600" }}>
        Temperature (°C)
      </Text>
      <TextInput
        placeholder="Optional"
        value={temperature}
        onChangeText={setTemperature}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      {/* Rainfall */}
      <Text style={{ marginBottom: 6, fontWeight: "600" }}>Rainfall (mm)</Text>
      <TextInput
        placeholder="Optional"
        value={rainfall}
        onChangeText={setRainfall}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleRecommend}
        style={{
          backgroundColor: "#2563eb",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", fontSize: 18 }}>
            Get Recommendation
          </Text>
        )}
      </TouchableOpacity>

      {/* Display Result */}
      {result && (
        <View
          style={{
            marginTop: 25,
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
            🌱 Best Crops for You
          </Text>

          {result.recommendations?.map((crop: any, idx: number) => (
            <View
              key={idx}
              style={{
                padding: 12,
                backgroundColor: "#f1f5f9",
                borderRadius: 8,
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {idx + 1}. {crop.name}
              </Text>

              <Text>Profit: ₹{crop.profit}</Text>
              <Text>Yield: {crop.yield} kg</Text>
              <Text>Reason: {crop.reason}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
