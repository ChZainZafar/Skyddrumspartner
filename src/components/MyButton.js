import { Button } from "react-native-paper";
import * as Constants from "../constants.js";
export default function MyButton({ title, onPress, loading, disabled }) {
  return (
    <Button
      onPress={onPress}
      mode="contained"
      buttonColor={Constants.THEME_COLOR}
      style={{
        width: "100%",
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        marginVertical: 6,
        alignSelf: "center",
        width: "90%",
      }}
      loading={loading}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}
