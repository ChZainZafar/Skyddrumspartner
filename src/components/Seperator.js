import { View } from "react-native";
import * as Constants from "../constants.js";

export default function Seperator() {
  return (
    <View
      style={{
        height: 2,
        width: "100%",
        backgroundColor: Constants.LIGHT_GRAY,
        marginVertical: 20,
      }}
    />
  );
}
