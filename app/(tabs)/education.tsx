// app/dashboard/education/index.tsx
import { supabase } from "@/lib/supabase";
import * as Linking from "expo-linking";
import { BookOpenText, Clock, PlayCircle } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type EducationItem = {
  id: string;
  title: string;
  description?: string;
  type: string;
  language: string;
  thumbnail_url?: string;
  content_url?: string;
  created_at: string;
};

export default function EducationPage() {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("education_content")
        .select(
          "id, title, description, type, language, thumbnail_url, content_url, created_at"
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to load content");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchContent();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const openContent = (url?: string) => {
    if (!url) {
      Alert.alert("लिंक नहीं मिला", "इस सामग्री के लिए लिंक उपलब्ध नहीं है।");
      return;
    }

    Linking.openURL(url).catch(() => {
      Alert.alert("त्रुटि", "लिंक नहीं खुल पाया।");
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7ba05b" />
        <Text style={styles.loadingText}>सामग्री लोड हो रही है...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2e4630" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>कृषि शिक्षण केंद्र</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <BookOpenText size={80} color="#9b8c63" />
            <Text style={styles.emptyText}>अभी कोई सामग्री उपलब्ध नहीं है</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => openContent(item.content_url)}
          >
            {/* Thumbnail */}
            {item.thumbnail_url ? (
              <Image
                source={{ uri: item.thumbnail_url }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholder}>
                {item.type === "video" ? (
                  <PlayCircle size={70} color="#b9b9b9" />
                ) : (
                  <BookOpenText size={70} color="#b9b9b9" />
                )}
              </View>
            )}

            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>

              <Text style={styles.desc} numberOfLines={2}>
                {item.description || "देखने के लिए टैप करें"}
              </Text>

              <View style={styles.footer}>
                <Text style={styles.lang}>{item.language.toUpperCase()}</Text>

                <View style={styles.dateRow}>
                  <Clock size={14} color="#868686" />
                  <Text style={styles.date}>{formatDate(item.created_at)}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2b3e2e" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2b3e2e",
  },
  loadingText: { color: "#d8e6c6", marginTop: 12, fontSize: 16 },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#3f593f",
    backgroundColor: "#2e4630",
  },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#fff" },

  card: {
    backgroundColor: "#3b563d",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#496b49",
  },

  thumbnail: { width: "100%", height: 200 },
  placeholder: {
    height: 200,
    backgroundColor: "#4f6b4d",
    justifyContent: "center",
    alignItems: "center",
  },

  content: { padding: 16 },
  title: { fontSize: 18, fontWeight: "700", color: "#ffffff", marginBottom: 6 },
  desc: { fontSize: 14, color: "#d0ddc7", lineHeight: 20, marginBottom: 12 },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  lang: {
    backgroundColor: "#8faa65",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 11,
    fontWeight: "600",
  },

  dateRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  date: { color: "#c4c4c4", fontSize: 12 },

  empty: { alignItems: "center", paddingVertical: 100 },
  emptyText: { marginTop: 16, fontSize: 17, color: "#c4c4c4" },
});
