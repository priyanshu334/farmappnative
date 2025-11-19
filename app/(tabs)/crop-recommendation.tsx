"use client";

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
      Alert.alert("जानकारी अधूरी है", "कृपया सभी अनिवार्य जानकारी भरें।");
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
      Alert.alert("त्रुटि", "कुछ गलत हो गया। कृपया दोबारा कोशिश करें।");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#e8f4e5" }}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              marginBottom: 16,
              color: "#4b3d16",
            }}
          >
            🌾 फसल सुझाव (AI Based)
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 12, color: "#4a4a4a" }}>
            अपनी खेत की स्थिति बताएँ और उचित फसल का सुझाव पाएं।
          </Text>

          {/* Soil Type */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{ fontWeight: "700", marginBottom: 6, color: "#4b3d16" }}
            >
              मिट्टी का प्रकार *
            </Text>
            <TextInput
              placeholder="जैसे – काली, लाल, दोमट, रेतीली…"
              value={soil}
              onChangeText={setSoil}
              style={{
                borderWidth: 1,
                borderColor: "#97b98a",
                backgroundColor: "#ffffff",
                padding: 12,
                borderRadius: 10,
                color: "#333",
              }}
            />
          </View>

          {/* Water Availability */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{ fontWeight: "700", marginBottom: 6, color: "#4b3d16" }}
            >
              पानी की उपलब्धता *
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {["कम", "मध्यम", "ज्यादा"].map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => setWater(level)}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderWidth: 2,
                    borderColor: water === level ? "#4c8a3f" : "#b1c9a7",
                    borderRadius: 10,
                    backgroundColor: water === level ? "#e5f6df" : "#fafcf8",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: water === level ? "#2f5e25" : "#4a4a4a",
                      fontWeight: water === level ? "700" : "500",
                    }}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Land Area */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{ fontWeight: "700", marginBottom: 6, color: "#4b3d16" }}
            >
              जमीन (एकड़) *
            </Text>
            <TextInput
              placeholder="जैसे – 2.5"
              value={land}
              onChangeText={setLand}
              keyboardType="decimal-pad"
              style={{
                borderWidth: 1,
                borderColor: "#97b98a",
                backgroundColor: "#ffffff",
                padding: 12,
                borderRadius: 10,
                color: "#333",
              }}
            />
          </View>

          {/* Temperature */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{ fontWeight: "700", marginBottom: 6, color: "#4b3d16" }}
            >
              तापमान (°C) – वैकल्पिक
            </Text>
            <TextInput
              placeholder="जैसे – 28"
              value={temperature}
              onChangeText={setTemperature}
              keyboardType="decimal-pad"
              style={{
                borderWidth: 1,
                borderColor: "#97b98a",
                backgroundColor: "#ffffff",
                padding: 12,
                borderRadius: 10,
                color: "#333",
              }}
            />
          </View>

          {/* Rainfall */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{ fontWeight: "700", marginBottom: 6, color: "#4b3d16" }}
            >
              वर्षा (mm) – वैकल्पिक
            </Text>
            <TextInput
              placeholder="जैसे – 800"
              value={rainfall}
              onChangeText={setRainfall}
              keyboardType="decimal-pad"
              style={{
                borderWidth: 1,
                borderColor: "#97b98a",
                backgroundColor: "#ffffff",
                padding: 12,
                borderRadius: 10,
                color: "#333",
              }}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleRecommend}
            disabled={loading}
            style={{
              backgroundColor: loading ? "#8b9b85" : "#4c8a3f",
              padding: 14,
              borderRadius: 10,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
                सुझाव देखें
              </Text>
            )}
          </TouchableOpacity>

          {/* Result */}
          {result && (
            <View
              style={{
                padding: 12,
                borderWidth: 2,
                borderRadius: 12,
                borderColor: "#b79b65",
                backgroundColor: "#fff8e7",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 10,
                  color: "#4b3d16",
                }}
              >
                🌱 सुझाई गई फसलें
              </Text>

              {result.recommendations?.map((crop: any, idx: number) => (
                <View
                  key={idx}
                  style={{
                    padding: 10,
                    borderBottomWidth:
                      idx === result.recommendations.length - 1 ? 0 : 1,
                    borderColor: "#d8c59c",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      marginBottom: 6,
                      color: "#2f5e25",
                    }}
                  >
                    {idx + 1}. {crop.name}
                  </Text>

                  <Text style={{ color: "#4a4a4a" }}>
                    • लाभ: ₹{crop.profit}
                  </Text>
                  <Text style={{ color: "#4a4a4a" }}>
                    • उत्पादन: {crop.yield} किलो
                  </Text>
                  <Text style={{ color: "#4a4a4a" }}>
                    • कारण: {crop.reason}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
