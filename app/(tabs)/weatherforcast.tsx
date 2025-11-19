import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface WeatherData {
  weather: { main: string; icon: string }[];
  main: { temp: number; humidity?: number };
  wind?: { speed?: number };
  name: string;
}

export default function WeatherConditionCheck() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userCondition, setUserCondition] = useState("");
  const [city, setCity] = useState("");

  const API_KEY = "b600e27331a72de9e83df98a57574e0e";

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLoading(false);
          alert("लोकेशन परमिशन देने से मना कर दिया गया।");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;

        const geo = await Location.reverseGeocodeAsync({ latitude, longitude });
        const detectedCity = geo[0]?.city || "अज्ञात";
        setCity(detectedCity);

        // Fetch weather
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.log("Weather error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={{ marginTop: 10, color: "#fff", fontSize: 16 }}>
          मौसम जानकारी प्राप्त की जा रही है...
        </Text>
      </SafeAreaView>
    );
  }

  if (!weather) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "#fff", fontSize: 18 }}>
          मौसम जानकारी प्राप्त नहीं हो सकी
        </Text>
      </SafeAreaView>
    );
  }

  const currentCondition =
    weather?.weather?.[0]?.main?.toLowerCase() || "unknown";
  const icon = weather?.weather?.[0]?.icon;
  const temp = weather?.main?.temp;
  const humidity = weather?.main?.humidity;
  const wind = weather?.wind?.speed;

  const matched =
    userCondition.trim() !== "" &&
    currentCondition.includes(userCondition.toLowerCase());

  const cropAdvice = () => {
    if (currentCondition.includes("rain"))
      return "🌧️ बारिश की संभावना है — फसल को सुरक्षित रखें और उचित निकास की व्यवस्था करें।";
    if (currentCondition.includes("clear"))
      return "☀️ मौसम साफ है — सिंचाई और दवाई का छिड़काव करने का अच्छा समय।";
    if (currentCondition.includes("cloud"))
      return "☁️ मौसम बादल वाला है — सिंचाई थोड़ी कम करें।";
    if (currentCondition.includes("storm"))
      return "⛈️ तेज तूफ़ान की संभावना है — खेत और जानवरों को सुरक्षित स्थान पर रखें।";
    return "📌 मौसम सामान्य है — नियमित कृषि काम जारी रखें।";
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.city}>{city} का मौसम 🌾</Text>

      {icon && (
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
          style={styles.icon}
        />
      )}

      <Text style={styles.temp}>{Math.round(temp)}°C</Text>
      <Text style={styles.condition}>{currentCondition.toUpperCase()}</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>💧 नमी: {humidity}%</Text>
        <Text style={styles.infoText}>💨 हवा की गति: {wind} m/s</Text>
      </View>

      <Text style={styles.advice}>{cropAdvice()}</Text>

      <TextInput
        placeholder="मौसम लिखें (जैसे: rainy, sunny)"
        value={userCondition}
        onChangeText={setUserCondition}
        style={styles.input}
        placeholderTextColor="#bbb"
      />

      {userCondition.length > 0 && (
        <Text style={styles.result}>
          {matched
            ? `✔️ हाँ, आज का मौसम "${userCondition}" जैसा है।`
            : `❌ नहीं, आज का मौसम "${userCondition}" जैसा नहीं है।`}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#0c1f0e",
    alignItems: "center",
  },
  center: {
    flex: 1,
    backgroundColor: "#0c1f0e",
    alignItems: "center",
    justifyContent: "center",
  },
  city: {
    fontSize: 26,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "700",
  },
  icon: { width: 160, height: 160 },
  temp: { fontSize: 60, color: "#fff", fontWeight: "300" },
  condition: { fontSize: 22, color: "#fff", marginBottom: 20 },
  input: {
    width: "85%",
    height: 50,
    backgroundColor: "#1a3d1f",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#3c6e47",
  },
  result: {
    marginTop: 15,
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: "#15321c",
    padding: 16,
    borderRadius: 12,
    width: "85%",
    marginTop: 15,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  advice: {
    width: "85%",
    backgroundColor: "#205c2e",
    color: "#fff",
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    fontSize: 15,
    lineHeight: 22,
  },
});
