import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import chapter1 from "../chapters/chapter1.json";
import chapter2 from "../chapters/chapter2.json";
import chapter3 from "../chapters/chapter3.json";
import Seperator from "../components/Seperator";
import logo from "../assets/logo.jpg";
import { Button } from "react-native-paper";
import * as constants from "../constants.js";
import { useEffect } from "react";
export default function ChapterListScreen({ navigation, route }) {
  const { inspectionRt, userId, inspectionId } = route.params;

  const baseChaptersMap = {
    chapter1: require("../chapters/chapter1.json"),
    chapter2: require("../chapters/chapter2.json"),
    chapter3: require("../chapters/chapter3.json"),
    chapter4: require("../chapters/chapter4.json"),
    chapter5: require("../chapters/chapter5.json"),
    chapter6: require("../chapters/chapter6.json"),
    chapter7: require("../chapters/chapter7.json"),
    chapter8: require("../chapters/chapter8.json"),
    chapter9: require("../chapters/chapter9.json"),
    chapter10: require("../chapters/chapter10.json"),
    chapter11: require("../chapters/chapter11.json"),
    chapter12: require("../chapters/chapter12.json"),
    chapter13: require("../chapters/chapter13.json"),
    chapter14: require("../chapters/chapter14.json"),
    chapter15: require("../chapters/chapter15.json"),
    chapter16: require("../chapters/chapter16.json"),
    chapter17: require("../chapters/chapter17.json"),
    chapter18: require("../chapters/chapter18.json"),
    chapter19: require("../chapters/chapter19.json"),
    chapter20: require("../chapters/chapter20.json"),
    chapter21: require("../chapters/chapter21.json"),
    chapter22: require("../chapters/chapter22.json"),
    chapter23: require("../chapters/chapter23.json"),
    chapter24: require("../chapters/chapter25.json"),
    chapter25: require("../chapters/chapter25.json"),

    // Add more chapters as needed
  };

  let chapterNames = [];
  for (let chapterIndex = 0; chapterIndex < 26; chapterIndex++) {
    chapterNames.push(`chapter${chapterIndex}`);
  }

  function onChapterClickHandle(chapterId) {
    console.log("chapterId", chapterId);
    if (chapterId == "chapter0") {
      navigation.navigate("ChapterZeroScreen", {
        answersP: inspectionRt[chapterId],
        userId: userId,
        inspectionId: inspectionId,
      });
    } else {
      let inspectionRtArray = Object.entries(inspectionRt).map(
        ([key, value]) => ({
          key,
          value,
        })
      );

      if (inspectionRtArray.some((item) => item.key === chapterId)) {
        navigation.navigate("ChapterScreen", {
          chapter: inspectionRt[chapterId],
          type: inspectionRt["chapter0"]["Skyddsrummet är byggt enligt_T"],
          userId: userId,
          inspectionId: inspectionId,
          // type: 2,
        });
      } else {
        navigation.navigate("ChapterScreen", {
          chapter: baseChaptersMap[chapterId],
          userId: userId,
          inspectionId: inspectionId,
          // type: 2,

          type: inspectionRt["chapter0"]["Skyddsrummet är byggt enligt_T"],
        });
      }
    }
  }

  function getProgress(chapterName) {
    if (inspectionRt[chapterName]) {
      let answersCount = 0;
      for (
        let inspectionIndex = 0;
        inspectionIndex < inspectionRt[chapterName]["questions"].length;
        inspectionIndex++
      ) {
        if (
          inspectionRt[chapterName]["questions"][inspectionIndex]["answer"] &&
          inspectionRt[chapterName]["questions"][inspectionIndex]["answer"][
            "checked"
          ]
        ) {
          answersCount++;
        }
      }
      return {
        progress: `${answersCount}/${inspectionRt[chapterName]["questions"].length}`,
        isCompleted:
          answersCount == `${inspectionRt[chapterName]["questions"].length}`,
      };
    } else {
      return {
        progress: `0/${baseChaptersMap[chapterName]["questions"].length}`,
        isCompleted: false,
      };
    }
  }

  return (
    <>
      <Image style={{ height: 150, width: "100%" }} source={logo} />
      <Seperator />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Button
          icon="download"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={{ margin: 2, fontSize: 12 }}
          buttonColor={constants.THEME_COLOR}
        >
          Komplett
        </Button>
        <Button
          icon="download"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={{ margin: 2, fontSize: 12 }}
          buttonColor={constants.THEME_COLOR}
        >
          Sammanfattad
        </Button>
        <Button
          icon="download"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={{ margin: 2, fontSize: 12 }}
          buttonColor={constants.THEME_COLOR}
        >
          Inventoring
        </Button>
      </View>
      <Seperator />
      <FlatList
        data={chapterNames}
        renderItem={({ item, index }) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  onChapterClickHandle(item);
                }}
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingHorizontal: 16,
                }}
              >
                {item == "chapter0" ? (
                  <Text style={{ fontSize: 12 }}>
                    {item.toUpperCase()} - Initial information
                  </Text>
                ) : (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>
                      {item.toUpperCase()} -{" "}
                      {baseChaptersMap[item]["chapter_name"]}
                    </Text>
                    <Text
                      style={{
                        color: getProgress(item).isCompleted ? "green" : "red",
                      }}
                    >
                      {getProgress(item).progress}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <Seperator />
            </>
          );
        }}
      />
    </>
  );
}
