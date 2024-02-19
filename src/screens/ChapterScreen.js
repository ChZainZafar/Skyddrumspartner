import { FlatList, Text, View } from "react-native";
import Question from "../components/Question";

export default function ChapterScreen({ route }) {
  const { chapter } = route.params;
  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: 10,
          borderBottomWidth: 2,
          alignSelf: "center",
        }}
      >
        <Text>{chapter.chapter_id}</Text>
        <Text>{chapter.chapter_name}</Text>
      </View>
      <FlatList
        data={chapter.questions}
        renderItem={({ item }) => {
          return (
            <Question
              question={item}
              onNextPress={() => {
                console.log("on next");
              }}
              onPreviousPress={() => {
                console.log("on previous");
              }}
            />
          );
        }}
      />
    </View>
  );
}
