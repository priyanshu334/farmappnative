"use client";

import {
  CloudRain,
  Droplet,
  MapPin,
  Sprout,
  Thermometer,
} from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      Alert.alert("Missing Information", "Please fill all required fields");
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
      Alert.alert("Error", "Something went wrong! Please try again.");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f8fafc" }}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#1e293b",
                marginBottom: 6,
              }}
            >
              🌾 AI Crop Recommendation
            </Text>
            <Text style={{ fontSize: 15, color: "#64748b", lineHeight: 22 }}>
              Get personalized crop suggestions based on your farm conditions
            </Text>
          </View>

          {/* Form Card */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 4,
              borderWidth: 1,
              borderColor: "#e2e8f0",
            }}
          >
            {/* Soil Type */}
            <View style={{ marginBottom: 18 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <MapPin size={18} color="#64748b" />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Soil Type <Text style={{ color: "#ef4444" }}>*</Text>
                </Text>
              </View>
              <TextInput
                placeholder="e.g., Black, Red, Clay, Sandy"
                placeholderTextColor="#94a3b8"
                value={soil}
                onChangeText={setSoil}
                style={{
                  borderWidth: 1.5,
                  borderColor: soil ? "#2563eb" : "#e2e8f0",
                  padding: 14,
                  borderRadius: 12,
                  fontSize: 15,
                  color: "#1e293b",
                  backgroundColor: "#f8fafc",
                }}
              />
            </View>

            {/* Water Availability */}
            <View style={{ marginBottom: 18 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Droplet size={18} color="#64748b" />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Water Availability <Text style={{ color: "#ef4444" }}>*</Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {["Low", "Medium", "High"].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setWater(level)}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: water === level ? "#2563eb" : "#e2e8f0",
                      backgroundColor: water === level ? "#eff6ff" : "#f8fafc",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: water === level ? "700" : "600",
                        color: water === level ? "#2563eb" : "#64748b",
                      }}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Land Area */}
            <View style={{ marginBottom: 18 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Sprout size={18} color="#64748b" />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Land Area (Acres) <Text style={{ color: "#ef4444" }}>*</Text>
                </Text>
              </View>
              <TextInput
                placeholder="e.g., 2.5"
                placeholderTextColor="#94a3b8"
                value={land}
                onChangeText={setLand}
                keyboardType="decimal-pad"
                style={{
                  borderWidth: 1.5,
                  borderColor: land ? "#2563eb" : "#e2e8f0",
                  padding: 14,
                  borderRadius: 12,
                  fontSize: 15,
                  color: "#1e293b",
                  backgroundColor: "#f8fafc",
                }}
              />
            </View>

            {/* Temperature */}
            <View style={{ marginBottom: 18 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Thermometer size={18} color="#64748b" />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Temperature (°C){" "}
                  <Text style={{ color: "#94a3b8", fontSize: 13 }}>
                    Optional
                  </Text>
                </Text>
              </View>
              <TextInput
                placeholder="e.g., 28"
                placeholderTextColor="#94a3b8"
                value={temperature}
                onChangeText={setTemperature}
                keyboardType="decimal-pad"
                style={{
                  borderWidth: 1.5,
                  borderColor: temperature ? "#2563eb" : "#e2e8f0",
                  padding: 14,
                  borderRadius: 12,
                  fontSize: 15,
                  color: "#1e293b",
                  backgroundColor: "#f8fafc",
                }}
              />
            </View>

            {/* Rainfall */}
            <View style={{ marginBottom: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <CloudRain size={18} color="#64748b" />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Rainfall (mm){" "}
                  <Text style={{ color: "#94a3b8", fontSize: 13 }}>
                    Optional
                  </Text>
                </Text>
              </View>
              <TextInput
                placeholder="e.g., 800"
                placeholderTextColor="#94a3b8"
                value={rainfall}
                onChangeText={setRainfall}
                keyboardType="decimal-pad"
                style={{
                  borderWidth: 1.5,
                  borderColor: rainfall ? "#2563eb" : "#e2e8f0",
                  padding: 14,
                  borderRadius: 12,
                  fontSize: 15,
                  color: "#1e293b",
                  backgroundColor: "#f8fafc",
                }}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleRecommend}
            disabled={loading}
            activeOpacity={0.8}
            style={{
              backgroundColor: loading ? "#94a3b8" : "#2563eb",
              padding: 16,
              borderRadius: 14,
              alignItems: "center",
              marginBottom: 20,
              shadowColor: "#2563eb",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }}>
                Get Recommendations
              </Text>
            )}
          </TouchableOpacity>

          {/* Display Result */}
          {result && (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 4,
                borderWidth: 1,
                borderColor: "#e2e8f0",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginBottom: 16,
                  color: "#1e293b",
                }}
              >
                🌱 Recommended Crops
              </Text>

              {result.recommendations?.map((crop: any, idx: number) => (
                <View
                  key={idx}
                  style={{
                    padding: 16,
                    backgroundColor: "#f8fafc",
                    borderRadius: 12,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: "#e2e8f0",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: "#2563eb",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        {idx + 1}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#1e293b",
                        flex: 1,
                      }}
                    >
                      {crop.name}
                    </Text>
                  </View>

                  <View style={{ gap: 6 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#64748b",
                          fontWeight: "600",
                          width: 80,
                        }}
                      >
                        Profit:
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#16a34a",
                          fontWeight: "700",
                        }}
                      >
                        ₹{crop.profit}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#64748b",
                          fontWeight: "600",
                          width: 80,
                        }}
                      >
                        Yield:
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#334155",
                          fontWeight: "600",
                        }}
                      >
                        {crop.yield} kg
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 4 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#64748b",
                          fontWeight: "600",
                          width: 80,
                        }}
                      >
                        Reason:
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#334155",
                          flex: 1,
                          lineHeight: 20,
                        }}
                      >
                        {crop.reason}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
