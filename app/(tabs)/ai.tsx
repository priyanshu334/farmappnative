// app/(tabs)/ai.tsx
import { Leaf, Send } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "नमस्ते किसान भाई! 👋\nमैं आपका AI सहायक हूँ। फसल, मौसम, कीमत, सरकारी योजनाएँ या कोई भी खेती की समस्या - मुझे बताइए, मैं तुरंत मदद करूँगा!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response (replace with real API later)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "धन्यवाद! आपकी बात समझ गया। मैं अभी आपके सवाल का सबसे सटीक जवाब तैयार कर रहा हूँ...",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";

    return (
      <View
        style={{
          flexDirection: isUser ? "row-reverse" : "row",
          marginVertical: 6,
          marginHorizontal: 12,
        }}
      >
        <View
          style={{
            backgroundColor: isUser ? "#2563eb" : "#f1f5f9",
            padding: 14,
            borderRadius: 18,
            maxWidth: "78%",
            borderTopLeftRadius: isUser ? 18 : 4,
            borderTopRightRadius: isUser ? 4 : 18,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: isUser ? "white" : "#1e293b",
              lineHeight: 22,
            }}
          >
            {item.text}
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: isUser ? "#c0dfff" : "#94a3b8",
              marginTop: 4,
              alignSelf: "flex-end",
            }}
          >
            {item.timestamp.toLocaleTimeString("hi-IN", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecfdf5" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#ecfdf5",
          paddingVertical: 16,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#bbf7d0",
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <View
          style={{
            backgroundColor: "#22c55e",
            padding: 10,
            borderRadius: 50,
          }}
        >
          <Leaf size={28} color="white" />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "800", color: "#166534" }}>
            किसान AI सहायक
          </Text>
          <Text style={{ fontSize: 14, color: "#16a34a" }}>हमेशा आपके साथ</Text>
        </View>
      </View>

      {/* Chat Background */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1592910299831-3a12f17eef75?w=800&q=10",
        }}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.07 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: false })
            }
            ListFooterComponent={
              isTyping ? (
                <View style={{ flexDirection: "row", padding: 16, gap: 8 }}>
                  <ActivityIndicator color="#22c55e" />
                  <Text style={{ color: "#16a34a", fontSize: 15 }}>
                    AI सोच रहा है...
                  </Text>
                </View>
              ) : null
            }
          />

          {/* Input Box */}
          <View
            style={{
              flexDirection: "row",
              padding: 12,
              backgroundColor: "white",
              borderTopWidth: 1,
              borderTopColor: "#e2e8f0",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              placeholder="यहाँ अपना सवाल लिखें... (हिंदी/अंग्रेजी)"
              placeholderTextColor="#94a3b8"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={sendMessage}
              style={{
                flex: 1,
                backgroundColor: "#f8fafc",
                paddingHorizontal: 18,
                paddingVertical: 14,
                borderRadius: 30,
                fontSize: 16,
                borderWidth: 1,
                borderColor: "#cbd5e1",
              }}
              multiline
            />
            <TouchableOpacity
              onPress={sendMessage}
              disabled={!inputText.trim()}
              style={{
                backgroundColor: inputText.trim() ? "#22c55e" : "#94a3b8",
                padding: 14,
                borderRadius: 50,
              }}
            >
              <Send size={24} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}
