import { Image, Text, View } from "react-native";
import logo from "../assets/logo.jpg";
import * as Constants from "../constants.js";
export default function Starter({ children }) {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          flex: 0.3,
          width: "100%",
          // justifyContent: "flex-start",
          // alignItems: "center",
          // marginTop: 100,
        }}
      >
        <Image
          source={logo}
          style={{
            height: "100%",
            width: "100%",
          }}
          // resizeMode="contain"
        />
      </View>
      <View
        style={{
          flex: 0.7,
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
