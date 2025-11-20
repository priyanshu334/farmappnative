"use client";

import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomerSupport({ userId }: { userId: string }) {
  const [question, setQuestion] = useState("");
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch user's previous queries
  const fetchQueries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("customer_support")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setQueries(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // Submit a new question
  const submitQuestion = async () => {
    if (!question.trim()) return Alert.alert("Error", "कृपया प्रश्न लिखें।");
    setSubmitting(true);
    const { data, error } = await supabase.from("customer_support").insert([
      {
        user_id: userId,
        question: question.trim(),
      },
    ]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setQuestion("");
      fetchQueries();
      Alert.alert("Success", "आपका प्रश्न भेज दिया गया है।");
    }
    setSubmitting(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fcf6e8" }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 16 }}>
          💬 ग्राहक सहायता
        </Text>

        {/* Input Section */}
        <View
          style={{
            marginBottom: 20,
            backgroundColor: "#fff",
            padding: 14,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <TextInput
            placeholder="अपना प्रश्न यहाँ लिखें..."
            value={question}
            onChangeText={setQuestion}
            multiline
            style={{
              minHeight: 60,
              fontSize: 16,
              color: "#4a3b15",
            }}
          />

          <TouchableOpacity
            onPress={submitQuestion}
            style={{
              marginTop: 12,
              backgroundColor: "#8a6122",
              paddingVertical: 10,
              borderRadius: 10,
              alignItems: "center",
            }}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontWeight: "700" }}>भेजें</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Previous Queries */}
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
          पिछले प्रश्न
        </Text>

        {loading ? (
          <ActivityIndicator />
        ) : queries.length === 0 ? (
          <Text style={{ color: "#6b5931" }}>कोई प्रश्न नहीं मिला।</Text>
        ) : (
          queries.map((q) => (
            <View
              key={q.id}
              style={{
                backgroundColor: "#fff7d6",
                padding: 14,
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "#4a3b15", fontWeight: "600" }}>
                ❓ {q.question}
              </Text>
              <Text style={{ color: "#2f7a2f", marginTop: 6 }}>
                💡 {q.answer || "उत्तर अभी नहीं मिला।"}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
