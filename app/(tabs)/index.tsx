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
      style={{ flex: 1, backgroundColor: "#fcf6e8" }}
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
            fontWeight: "800",
            marginBottom: 6,
            color: "#4a3b15",
          }}
        >
          👨‍🌾 नमस्कार किसान भाई!
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#6b5931",
            marginBottom: 24,
          }}
        >
          आपके खेत की तरक्की के लिए स्मार्ट और भरोसेमंद समाधान 🌱
        </Text>

        {/* Banner */}
        <View
          style={{
            backgroundColor: "#fff7d6",
            borderRadius: 18,
            padding: 20,
            marginBottom: 24,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                marginBottom: 6,
                color: "#7c5a14",
              }}
            >
              स्मार्ट फ़सल सुझाव
            </Text>
            <Text style={{ color: "#5f4b15", fontSize: 15, lineHeight: 20 }}>
              अपनी मिट्टी और ज़मीन के हिसाब से AI के द्वारा फसल सुझाव पाएं।
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/crop-recommendation")}
              style={{
                marginTop: 14,
                backgroundColor: "#8a6122",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignSelf: "flex-start",
                shadowColor: "#8a6122",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700", fontSize: 15 }}>
                अभी देखें →
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../assets/splash.jpeg")}
            style={{ width: 95, height: 95, borderRadius: 12 }}
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
              borderColor: "#f2e7c8",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff1dd",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <BarChart2 size={24} color="#8a6122" />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                fontWeight: "600",
                color: "#4a3b15",
              }}
            >
              मंडी भाव
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
              borderColor: "#f2e7c8",
            }}
          >
            <View
              style={{
                backgroundColor: "#eaffea",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Landmark size={24} color="#2f7a2f" />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                fontWeight: "600",
                color: "#4a3b15",
              }}
            >
              सरकारी योजनाएँ
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
              borderColor: "#f2e7c8",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff5cc",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <BookOpen size={24} color="#b98221" />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                fontWeight: "600",
                color: "#4a3b15",
              }}
            >
              खेती रिकॉर्ड
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
              borderColor: "#f2e7c8",
            }}
          >
            <View
              style={{
                backgroundColor: "#ffeefe",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Bot size={24} color="#9350c7" />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                fontWeight: "600",
                color: "#4a3b15",
              }}
            >
              AI सलाहकार
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
              borderColor: "#f2e7c8",
            }}
          >
            <View
              style={{
                backgroundColor: "#e6fdff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <CloudSun size={24} color="#007e9f" />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                fontWeight: "600",
                color: "#4a3b15",
              }}
            >
              मौसम जानकारी
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/education")}
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
              borderColor: "#f2e7c8",
            }}
          >
            <View
              style={{
                backgroundColor: "#e6fdff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <CloudSun size={24} color="#007e9f" />
            </View>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                fontWeight: "600",
                color: "#4a3b15",
              }}
            >
              Education
            </Text>
          </TouchableOpacity>
        </View>
        {/* Customer Support Button */}
      </ScrollView>

      {/* Floating Customer Support Button */}
      <TouchableOpacity
        onPress={() => router.push("/customer_support")}
        activeOpacity={0.8}
        style={{
          position: "absolute",
          bottom: 30,
          right: 20,
          backgroundColor: "#ffd700",
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 30,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "700",
            color: "#4a3b15",
          }}
        >
          💬 सहायता
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
