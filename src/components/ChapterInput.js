import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function ChapterInput({ value, onChangeText }) {
  return (
    <TextInput
      value={value}
      onChangeText={(text) => {
        onChangeText(text);
      }}
      style={styles.textInput}
      selectionColor={"black"}
      underlineColor={"black"}
      outlineColor={"black"}
      activeOutlineColor={"black"}
      //   activeUnderlineColor={"black"}
      mode={"outlined"}
      textAlign="center"
    />
  );
}
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    height: 40,
    fontSize: 14,
  },
});
