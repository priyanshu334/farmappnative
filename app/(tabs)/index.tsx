import { Href, router } from "expo-router";
import {
  BarChart2,
  BookOpen,
  Bot,
  CloudSun,
  Landmark,
} from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <ScrollView
      style={{ flex: 1, padding: 20 }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header */}
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
        👨‍🌾 Welcome Farmer
      </Text>

      <Text style={{ fontSize: 16, color: "gray", marginBottom: 25 }}>
        Smart tools for better farming decisions 🌱
      </Text>

      {/* Banner */}
      <View
        style={{
          backgroundColor: "#e6f4ff",
          borderRadius: 18,
          padding: 20,
          marginBottom: 25,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 6 }}>
            Smart Crop Guide
          </Text>
          <Text style={{ color: "#555" }}>
            Get AI-recommended crops based on your soil & land.
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/crop-recommendation")}
            style={{
              marginTop: 12,
              backgroundColor: "#2563eb",
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 8,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "white" }}>Try Now</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../assets/splash.jpeg")}
          style={{ width: 80, height: 80, marginLeft: 10 }}
          resizeMode="contain"
        />
      </View>

      {/* Feature Cards */}
      <View style={{ gap: 15 }}>
        {/* Market Prices */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/market-prices")}
          style={{
            padding: 20,
            backgroundColor: "white",
            borderRadius: 14,
            elevation: 3,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BarChart2 size={28} color="#2563eb" />
          <Text style={{ fontSize: 18, marginLeft: 15 }}>Market Prices</Text>
        </TouchableOpacity>

        {/* Government Schemes */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/schemes")}
          style={{
            padding: 20,
            backgroundColor: "white",
            borderRadius: 14,
            elevation: 3,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Landmark size={28} color="#16a34a" />
          <Text style={{ fontSize: 18, marginLeft: 15 }}>Govt. Schemes</Text>
        </TouchableOpacity>

        {/* Farm Records */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/farm-records")}
          style={{
            padding: 20,
            backgroundColor: "white",
            borderRadius: 14,
            elevation: 3,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BookOpen size={28} color="#d97706" />
          <Text style={{ fontSize: 18, marginLeft: 15 }}>Farm Records</Text>
        </TouchableOpacity>

        {/* AI Farming Assistant */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/ai" as Href)}
          style={{
            padding: 20,
            backgroundColor: "white",
            borderRadius: 14,
            elevation: 3,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Bot size={28} color="#8b5cf6" />
          <Text style={{ fontSize: 18, marginLeft: 15 }}>AI Assistant</Text>
        </TouchableOpacity>

        {/* Weather Forecast */}
        <TouchableOpacity
          onPress={() => router.push("/scheme-details")}
          style={{
            padding: 20,
            backgroundColor: "white",
            borderRadius: 14,
            elevation: 3,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CloudSun size={28} color="#0891b2" />
          <Text style={{ fontSize: 18, marginLeft: 15 }}>Weather Forecast</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
