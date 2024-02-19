import { Text, TouchableOpacity } from "react-native";

export default function Bar({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{
        backgroundColor: "white",
        opacity: 0.9,
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 2,
      }}
    >
      <Text style={{ fontSize: 18 }}>{title}</Text>
      <Text>{">"}</Text>
    </TouchableOpacity>
  );
}
