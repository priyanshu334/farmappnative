import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function AuthLanding() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      {/* 🔵 Top Image Section */}
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRij8uW1QkI0--AFjWFQzDY4jvNcbRjwaJxcg&s",
        }}
        style={{
          width: "100%",
          height: 400,
          borderRadius: 16,
          marginBottom: 40,
        }}
        resizeMode="cover"
      />

      {/* 🔵 Heading */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Welcome to Your App
      </Text>

      {/* 🔵 Login Button */}
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "#4a90e2",
          paddingVertical: 14,
          borderRadius: 10,
          marginBottom: 12,
        }}
        onPress={() => router.push("/login")}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
          Login
        </Text>
      </TouchableOpacity>

      {/* 🔵 Signup Button */}
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "#50c878",
          paddingVertical: 14,
          borderRadius: 10,
        }}
        onPress={() => router.push("/signup")}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
          Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
}
