import { Image, Text, View } from "react-native";
import Insects from "../assets/Insects.png";
import * as Constants from "../constants.js";
export default function Starter({ children }) {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={Insects}
          style={{
            height: 300,
            width: 300,
          }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: Constants.OFFWHITE,
          borderTopRightRadius: 30,
          justifyContent: "center",
          padding: 20,
        }}
      >
        {children}
      </View>
    </View>
  );
}
