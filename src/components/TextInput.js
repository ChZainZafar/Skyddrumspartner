import { TextInput as RNPTextInput } from "react-native-paper";

export default function TextInput({ label, value, setValue }) {
  return (
    <RNPTextInput
      label={label}
      value={value}
      onChangeText={(text) => setValue(text)}
      mode="outlined"
      selectionColor={"red"}
      underlineColor={"red"}
      outlineColor={"red"}
      activeOutlineColor={"red"}
      activeUnderlineColor={"red"}
      autoCapitalize="none"
      style={{ width: "80%", alignSelf: "center", marginVertical: 3 }}
    />
  );
}
