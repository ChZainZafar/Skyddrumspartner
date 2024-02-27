import { FlatList, Text, View } from "react-native";
import Question from "../components/Question";
import Seperator from "../components/Seperator";
import { useState } from "react";
import MyButton from "../components/MyButton";
import { writeRealtimeDocument } from "../config/firebase.js";
import * as Updates from "expo-updates";

export default function ChapterScreen({ route }) {
  const { chapter, userId, inspectionId, type } = route.params;
  const [answers, setAnswers] = useState({});
  const [isChapterSubmitting, setIsChapterSubmitting] = useState(false);
  // console.log(type);
  // console.log(chapter);
  const handleAnswerChange = (answerData) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [answerData.questionId]: answerData,
    }));
  };

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: 10,
          borderBottomWidth: 2,
          alignSelf: "center",
          // flexDirection: "row",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          {chapter.chapter_id} - {chapter.chapter_name}
        </Text>
        {/* <Text>{chapter.chapter_name}</Text> */}
      </View>
      <FlatList
        data={chapter.questions}
        renderItem={({ item }) => {
          return item["types"].includes(String(type)) ? (
            <>
              <Question
                question={item}
                onNextPress={() => {
                  console.log("on next");
                }}
                onPreviousPress={() => {
                  console.log("on previous");
                }}
                handleAnswer={handleAnswerChange}
              />
              <Seperator />
            </>
          ) : null;
        }}
      />
      <MyButton
        title={"Submit"}
        onPress={async () => {
          let chapterClone = chapter;
          chapterClone.questions.map((question) => {
            return answers.hasOwnProperty(question.question_id)
              ? (question["answer"] = answers[question.question_id])
              : question;
          });

          try {
            setIsChapterSubmitting(true);
            // console.log("Before writing");
            console.log(
              userId,
              inspectionId,
              "chapter",
              chapterClone["chapter_id"]
            );
            await writeRealtimeDocument(
              `${userId}/${inspectionId}/chapter${chapterClone["chapter_id"]}`,
              chapterClone
            );

            setIsChapterSubmitting(false);
            // Updates.reloadAsync();
          } catch (e) {
            console.log(e);
            setIsChapterSubmitting(false);
          }
        }}
        loading={isChapterSubmitting}
      />
    </View>
  );
}
