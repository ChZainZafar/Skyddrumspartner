import { View } from "react-native";
import chapter1 from "../chapters/chapter1.json";
import MyButton from "../components/MyButton";
export default function ChapterListScreen({ navigation }) {
  return (
    <View>
      <MyButton
        title={"Chapter 1"}
        onPress={() => {
          navigation.navigate("ChapterScreen", {
            chapter: chapter1,
          });
        }}
      />
    </View>
  );
}
