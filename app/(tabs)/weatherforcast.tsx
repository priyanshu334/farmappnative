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

export default function WeatherConditionCheck() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCondition, setUserCondition] = useState("");

  const API_KEY = "YOUR_API_KEY";
  const CITY = "Nagpur"; // Change as needed

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching weather: ", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Fetching todays weather...</Text>
      </SafeAreaView>
    );
  }

  if (!weather) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Unable to load weather data</Text>
      </SafeAreaView>
    );
  }

  const currentCondition = weather.weather[0]?.main.toLowerCase();
  const icon = weather.weather[0]?.icon;
  const temp = weather.main?.temp;
  const humidity = weather.main?.humidity;
  const wind = weather.wind?.speed;

  const conditionMatched =
    userCondition.trim() !== "" &&
    currentCondition.includes(userCondition.toLowerCase());

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>

      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
        style={styles.icon}
      />

      <Text style={styles.temp}>{Math.round(temp)}°C</Text>
      <Text style={styles.condition}>{currentCondition.toUpperCase()}</Text>

      {/* User condition input */}
      <TextInput
        placeholder="Enter a condition (e.g. rainy, sunny)"
        value={userCondition}
        onChangeText={setUserCondition}
        style={styles.input}
      />

      {/* Result */}
      {userCondition.length > 0 && (
        <Text style={styles.result}>
          {conditionMatched
            ? `Yes, today's weather matches "${userCondition}".`
            : `No, today's weather does not match "${userCondition}".`}
        </Text>
      )}

      {/* Weather stats */}
      <View style={styles.card}>
        <Text style={styles.info}>Humidity: {humidity}%</Text>
        <Text style={styles.info}>Wind: {wind} m/s</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  city: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  icon: {
    width: 150,
    height: 150,
  },
  temp: {
    fontSize: 48,
    fontWeight: "300",
  },
  condition: {
    fontSize: 20,
    marginTop: 4,
    marginBottom: 20,
    color: "#444",
  },
  input: {
    width: "85%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    fontSize: 16,
  },
  result: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    width: "80%",
  },
  card: {
    marginTop: 20,
    padding: 15,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
  },
});
