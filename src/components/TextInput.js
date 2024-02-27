import { TextInput as RNPTextInput } from "react-native-paper";
import * as constants from "../constants.js";
export default function TextInput({ label, value, setValue }) {
  return (
    <RNPTextInput
      label={label}
      value={value}
      onChangeText={(text) => setValue(text)}
      mode="outlined"
      selectionColor={constants.THEME_COLOR}
      underlineColor={constants.THEME_COLOR}
      outlineColor={constants.THEME_COLOR}
      activeOutlineColor={constants.THEME_COLOR}
      activeUnderlineColor={constants.THEME_COLOR}
      autoCapitalize="none"
      style={{
        width: "80%",
        alignSelf: "center",
        marginVertical: 3,
        height: 40,
        fontSize: 12,
        backgroundColor: "white",
      }}
    />
  );
}
