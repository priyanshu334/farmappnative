import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

export default function AuthLanding() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#fdf8e4", "#fff"]}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      {/* 🌾 Farmer Image */}
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/61/30/97/6130977243329f9ad2c1e31422043f15.jpg",
        }}
        style={{
          width: "60%",
          height: 230,
          borderRadius: 20,
          marginBottom: 30,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 10,
        }}
        resizeMode="cover"
      />

      {/* 🌾 Heading */}
      <Text
        style={{
          fontSize: 30,
          fontWeight: "800",
          marginBottom: 10,
          textAlign: "center",
          color: "#3b2f0b",
        }}
      >
        किसान साथी App में आपका स्वागत है
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "#5c4a1d",
          marginBottom: 40,
        }}
      >
        खेती, मौसम, शिक्षा और सहूलियत – सब एक जगह
      </Text>

      {/* 🔶 Login Button */}
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "#8B5E34",
          paddingVertical: 15,
          borderRadius: 12,
          marginBottom: 16,
          shadowColor: "#8B5E34",
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
        onPress={() => router.push("/login_with_otp")}
      >
        <Text
          style={{
            color: "#fffdf4",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          लॉगिन करें
        </Text>
      </TouchableOpacity>

      {/* 🌿 Signup Button */}
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "#6B8E23",
          paddingVertical: 15,
          borderRadius: 12,
          shadowColor: "#6B8E23",
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
        onPress={() => router.push("/signup")}
      >
        <Text
          style={{
            color: "#fffdf4",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          नया खाता बनाएं
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
