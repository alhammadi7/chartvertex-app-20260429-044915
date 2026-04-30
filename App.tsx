import React from "react";
import { View, Text } from "react-native";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#06080F",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#F0F4FF", fontSize: 32, fontWeight: "800" }}>
        ChartVertex
      </Text>
      <Text style={{ color: "#7A869A", marginTop: 10 }}>
        App is running
      </Text>
    </View>
  );
}