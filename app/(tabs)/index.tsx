import { Href, router } from "expo-router";
import {
  BarChart2,
  BookOpen,
  Bot,
  CloudSun,
  Landmark,
} from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f8fafc" }}
      edges={["top"]}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 8,
            color: "#1e293b",
          }}
        >
          👨‍🌾 Welcome Farmer
        </Text>

        <Text style={{ fontSize: 16, color: "#64748b", marginBottom: 24 }}>
          Smart tools for better farming decisions 🌱
        </Text>

        {/* Banner */}
        <View
          style={{
            backgroundColor: "#dbeafe",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 6,
                color: "#1e40af",
              }}
            >
              Smart Crop Guide
            </Text>
            <Text style={{ color: "#475569", fontSize: 14, lineHeight: 20 }}>
              Get AI-recommended crops based on your soil & land.
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/crop-recommendation")}
              style={{
                marginTop: 14,
                backgroundColor: "#2563eb",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignSelf: "flex-start",
                shadowColor: "#2563eb",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 15 }}>
                Try Now
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../assets/splash.jpeg")}
            style={{ width: 90, height: 90, borderRadius: 12 }}
            resizeMode="cover"
          />
        </View>

        {/* Feature Cards */}
        <View style={{ gap: 14 }}>
          {/* Market Prices */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/market-prices")}
            activeOpacity={0.7}
            style={{
              padding: 18,
              backgroundColor: "white",
              borderRadius: 14,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e2e8f0",
            }}
          >
            <View
              style={{
                backgroundColor: "#eff6ff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <BarChart2 size={24} color="#2563eb" />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                fontWeight: "600",
                color: "#1e293b",
              }}
            >
              Market Prices
            </Text>
          </TouchableOpacity>

          {/* Government Schemes */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/schemes")}
            activeOpacity={0.7}
            style={{
              padding: 18,
              backgroundColor: "white",
              borderRadius: 14,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e2e8f0",
            }}
          >
            <View
              style={{
                backgroundColor: "#f0fdf4",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Landmark size={24} color="#16a34a" />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                fontWeight: "600",
                color: "#1e293b",
              }}
            >
              Govt. Schemes
            </Text>
          </TouchableOpacity>

          {/* Farm Records */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/farm-records")}
            activeOpacity={0.7}
            style={{
              padding: 18,
              backgroundColor: "white",
              borderRadius: 14,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e2e8f0",
            }}
          >
            <View
              style={{
                backgroundColor: "#fef3c7",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <BookOpen size={24} color="#d97706" />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                fontWeight: "600",
                color: "#1e293b",
              }}
            >
              Farm Records
            </Text>
          </TouchableOpacity>

          {/* AI Farming Assistant */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/ai" as Href)}
            activeOpacity={0.7}
            style={{
              padding: 18,
              backgroundColor: "white",
              borderRadius: 14,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e2e8f0",
            }}
          >
            <View
              style={{
                backgroundColor: "#faf5ff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Bot size={24} color="#8b5cf6" />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                fontWeight: "600",
                color: "#1e293b",
              }}
            >
              AI Assistant
            </Text>
          </TouchableOpacity>

          {/* Weather Forecast */}
          <TouchableOpacity
            onPress={() => router.push("/weatherforcast")}
            activeOpacity={0.7}
            style={{
              padding: 18,
              backgroundColor: "white",
              borderRadius: 14,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e2e8f0",
            }}
          >
            <View
              style={{
                backgroundColor: "#ecfeff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <CloudSun size={24} color="#0891b2" />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                fontWeight: "600",
                color: "#1e293b",
              }}
            >
              Weather Forecast
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
