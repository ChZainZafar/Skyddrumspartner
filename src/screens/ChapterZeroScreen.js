import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import ChapterInput from "../components/ChapterInput";
import { CheckBox } from "react-native-elements";
import { getRadioButtonStyleProps } from "../commonFunctions";
import MyButton from "../components/MyButton";
import { writeRealtimeDocument } from "../config/firebase";
import * as Updates from "expo-updates";
export default function ChapterZeroScreen({ route, navigation }) {
  const { answersP, srgNumber = "", userId } = route.params;
  const [answers, setAnswers] = useState(answersP ? answersP : {});
  const [isChapterSubmitting, setIsChapterSubmitting] = useState(false);

  useEffect(() => {
    if (answers["Nettoarea A"] && answers["Skyddsrummet är byggt enligt_T"]) {
      //   console.log("before setting");
      setAnswers({
        ...answers,
        ["Antal skyddsplatser B utifrản nettoarean"]: String(
          answers["Nettoarea A"] * answers["Skyddsrummet är byggt enligt_T"]
        ),
      });
      //   console.log(answers);
    }
  }, [answers["Nettoarea A"], answers["Skyddsrummet är byggt enligt_T"]]);
  useEffect(() => {
    if (
      answers["Antal skyddsplatser C utifrản ventilationssystemet"] &&
      answers["Antal skyddsplatser B utifrản nettoarean"]
    ) {
      //   console.log("before setting");
      let smallest = Math.min(
        answers["Antal skyddsplatser C utifrản ventilationssystemet"],
        answers["Antal skyddsplatser B utifrản nettoarean"]
      );
      setAnswers({
        ...answers,
        ["Minsta värdet av B och C"]: String(smallest),
      });
      //   console.log(answers);
    }
  }, [
    answers["Antal skyddsplatser C utifrản ventilationssystemet"],
    answers["Antal skyddsplatser B utifrản nettoarean"],
  ]);
  useEffect(() => {
    if (
      answers["Minsta värdet av B och C"] &&
      answers["Antal skyddsplatser E enligt skyddsrumsregistret"]
    ) {
      //   console.log("before setting");

      let lr = 0.9 * answers["Minsta värdet av B och C"];
      let rr = 1.1 * answers["Minsta värdet av B och C"];

      if (
        answers["Antal skyddsplatser E enligt skyddsrumsregistret"] < rr &&
        answers["Antal skyddsplatser E enligt skyddsrumsregistret"] > lr
      ) {
        setAnswers({
          ...answers,
          ["Dimensionerande antal skyddsplatser F"]:
            answers["Antal skyddsplatser E enligt skyddsrumsregistret"],
        });
      } else {
        setAnswers({
          ...answers,
          ["Dimensionerande antal skyddsplatser F"]:
            answers["Minsta värdet av B och C"],
        });
      }

      //   console.log(answers);
    }
  }, [
    answers["Minsta värdet av B och C"],
    answers["Antal skyddsplatser E enligt skyddsrumsregistret"],
  ]);
  useEffect(() => {
    if (srgNumber) {
      setAnswers({ ...answers, ["Kontrollantens SRG-nr"]: String(srgNumber) });
    }
  }, [srgNumber]);
  return (
    <>
      <ScrollView
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "white",
          paddingHorizontal: 10,
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            borderWidth: 1,
            marginBottom: 6,
            alignItems: "center",
            // justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "medium",
              padding: 3,
              fontSize: 20,
              paddingVertical: 6,
            }}
          >
            00a
          </Text>
          <Text
            style={{
              fontWeight: "medium",
              flex: 1,
              fontSize: 20,
              borderLeftWidth: 2,
              paddingVertical: 6,
              alignSelf: "center",
              paddingHorizontal: 6,
            }}
          >
            Uppgifter om skyddsrummet
          </Text>
        </View>
        <View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Kommun:</Text>
            <ChapterInput
              value={answers["Kommun"]}
              onChangeText={(text) => {
                setAnswers({ ...answers, ["Kommun"]: text });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Tätort:</Text>
            <ChapterInput
              value={answers["Tätort"]}
              onChangeText={(text) => {
                setAnswers({ ...answers, ["Tätort"]: text });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Fastighetsbeteckning:</Text>
            <ChapterInput
              value={answers["Fastighetsbeteckning"]}
              onChangeText={(text) => {
                setAnswers({ ...answers, ["Fastighetsbeteckning"]: text });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Skyddsrumsnummer:</Text>
            <ChapterInput
              value={answers["Skyddsrumsnummer"]}
              onChangeText={(text) => {
                setAnswers({ ...answers, ["Skyddsrumsnummer"]: text });
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            borderWidth: 1,
            marginBottom: 6,
            alignItems: "center",
            marginVertical: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "medium",
              padding: 3,
              fontSize: 20,
              paddingVertical: 6,
            }}
          >
            00b
          </Text>
          <Text
            style={{
              fontWeight: "medium",
              flex: 1,
              fontSize: 20,
              borderLeftWidth: 2,
              paddingVertical: 6,
              alignSelf: "center",
              paddingHorizontal: 6,
            }}
          >
            Uppgifter som ska kontrolleras eller kompletteras
          </Text>
        </View>
        <View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Skyddsrummet finns:</Text>
            <View
              style={{
                borderWidth: 1,
                flexDirection: "row",
                padding: 0,
                height: 40,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <CheckBox
                title="ja"
                checked={answers["Skyddsrummet finns"] === "ja"}
                onPress={() =>
                  setAnswers({ ...answers, ["Skyddsrummet finns"]: "ja" })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="nej"
                checked={answers["Skyddsrummet finns"] === "nej"}
                onPress={() =>
                  setAnswers({ ...answers, ["Skyddsrummet finns"]: "nej" })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
            </View>
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>
              Gatuadress vid ingång till skyddsrummet:
            </Text>
            <ChapterInput
              value={answers["Gatuadress vid ingàng till skyddsrummet"]}
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["Gatuadress vid ingàng till skyddsrummet"]: text,
                });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>
              Skyddsrummets koordinater i SWEREFF 99TM -- N:
            </Text>
            <ChapterInput
              value={answers["SWEREFF_N"]}
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["SWEREFF_N"]: text,
                });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>
              Skyddsrummets koordinater i SWEREFF 99TM -- E:
            </Text>
            <ChapterInput
              value={answers["SWEREFF_E"]}
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["SWEREFF_E"]: text,
                });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Skyddsrummet finns:</Text>
            <View
              style={{
                borderWidth: 1,
                flexDirection: "row",
                padding: 0,
                height: 40,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <CheckBox
                title="Övre"
                checked={answers["SWEREFF_A"] === "Övre plan"}
                onPress={() =>
                  setAnswers({ ...answers, ["SWEREFF_A"]: "Övre plan" })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="Nedre"
                checked={answers["SWEREFF_A"] === "Nedre plan"}
                onPress={() =>
                  setAnswers({ ...answers, ["SWEREFF_A"]: "Nedre plan" })
                }
                {...getRadioButtonStyleProps()}
                size={15}
              />
            </View>
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Skyddsrum är av typ A6_S3:</Text>
            <View
              style={{
                borderWidth: 1,
                flexDirection: "row",
                padding: 0,
                height: 40,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <CheckBox
                title="ja"
                checked={answers["A6_S3"] === "ja"}
                onPress={() => setAnswers({ ...answers, ["A6_S3"]: "ja" })}
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="nej"
                checked={answers["A6_S3"] === "nej"}
                onPress={() => setAnswers({ ...answers, ["A6_S3"]: "nej" })}
                {...getRadioButtonStyleProps()}
                size={18}
              />
            </View>
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>
              Utrymmet är ett splitterskyddsrum:
            </Text>
            <View
              style={{
                borderWidth: 1,
                flexDirection: "row",
                padding: 0,
                height: 40,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <CheckBox
                title="ja"
                checked={answers["Utrymmet är ett splitterskyddsrum"] === "ja"}
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Utrymmet är ett splitterskyddsrum"]: "ja",
                  })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="nej"
                checked={answers["Utrymmet är ett splitterskyddsrum"] === "nej"}
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Utrymmet är ett splitterskyddsrum"]: "nej",
                  })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
            </View>
          </View>
          <View style={styles.answerGroup}>
            <Text
              style={{
                paddingVertical: 10,
                paddingHorizontal: 3,
                borderWidth: 1,
                marginRight: 1,
                borderRadius: 3,
                alignSelf: "center",
                fontWeight: "600",
                maxWidth: 200,
                height: 120,
              }}
            >
              Skyddsrummet är byggt enligt:
            </Text>
            <View
              style={{
                borderWidth: 1,
                flexDirection: "column",
                padding: 0,
                // height: 40,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <CheckBox
                title="S7"
                checked={answers["Skyddsrummet är byggt enligt_A"] === "S7"}
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Skyddsrummet är byggt enligt_A"]: "S7",
                    ["Skyddsrummet är byggt enligt_T"]: 1,
                  })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="Askr"
                checked={answers["Skyddsrummet är byggt enligt_A"] === "Askr"}
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Skyddsrummet är byggt enligt_A"]: "Askr",
                    ["Skyddsrummet är byggt enligt_T"]: 1,
                  })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="Nskr"
                checked={answers["Skyddsrummet är byggt enligt_A"] === "Nskr"}
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Skyddsrummet är byggt enligt_A"]: "Nskr",
                    ["Skyddsrummet är byggt enligt_T"]: 2,
                  })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="TB74"
                checked={answers["Skyddsrummet är byggt enligt_A"] === "TB74"}
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Skyddsrummet är byggt enligt_A"]: "TB74",
                    ["Skyddsrummet är byggt enligt_T"]: 2,
                  })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="TB78"
                checked={answers["Skyddsrummet är byggt enligt_A"] === "TB78"}
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Skyddsrummet är byggt enligt_A"]: "TB78",
                    ["Skyddsrummet är byggt enligt_T"]: 2,
                  })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="SR"
                checked={answers["Skyddsrummet är byggt enligt_A"] === "SR"}
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Skyddsrummet är byggt enligt_A"]: "SR",
                    ["Skyddsrummet är byggt enligt_T"]: 3,
                  })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
            </View>
          </View>
          <View style={styles.answerGroup}>
            <Text
              style={{
                paddingVertical: 10,
                paddingHorizontal: 3,
                borderWidth: 1,
                marginRight: 1,
                borderRadius: 3,
                alignSelf: "center",
                fontWeight: "600",
                height: 69,
                maxWidth: 200,
              }}
            >
              Typ av luftrening:
            </Text>
            <View
              style={{
                borderWidth: 1,
                flexDirection: "column",
                padding: 0,
                //   height: 40,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <CheckBox
                title="gas- och dimfilter"
                checked={answers["Typ av luftrening"] === "gas- och dimfilter"}
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Typ av luftrening"]: "gas- och dimfilter",
                  })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="sandfilter"
                checked={answers["Typ av luftrening"] === "sandfilter"}
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Typ av luftrening"]: "sandfilter",
                  })
                }
                {...getRadioButtonStyleProps()}
                size={15}
              />
              <CheckBox
                title="F-A-G-filter"
                checked={answers["Typ av luftrening"] === "F-A-G-filter"}
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Typ av luftrening"]: "F-A-G-filter",
                  })
                }
                {...getRadioButtonStyleProps()}
                size={15}
              />
            </View>
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>
              Modernisering av komponenter har skett:
            </Text>
            <View
              style={{
                borderWidth: 1,
                flexDirection: "row",
                padding: 0,
                height: 40,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <CheckBox
                title="ja"
                checked={
                  answers["Modernisering av komponenter har skett"] === "ja"
                }
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Modernisering av komponenter har skett"]: "ja",
                  })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="nej"
                checked={
                  answers["Modernisering av komponenter har skett"] === "nej"
                }
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Modernisering av komponenter har skett"]: "nej",
                  })
                }
                {...getRadioButtonStyleProps()}
                size={15}
              />
            </View>
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>
              Stålstomme med synliga balkar och pelare finns:
            </Text>
            <View
              style={{
                borderWidth: 1,
                flexDirection: "row",
                padding: 0,
                height: 40,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <CheckBox
                title="ja"
                checked={
                  answers["Stalstomme med synliga balkar och pelare finns"] ===
                  "ja"
                }
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Stalstomme med synliga balkar och pelare finns"]: "ja",
                  })
                }
                {...getRadioButtonStyleProps()}
                size={18}
              />
              <CheckBox
                title="nej"
                checked={
                  answers["Stalstomme med synliga balkar och pelare finns"] ===
                  "nej"
                }
                onPress={() =>
                  setAnswers({
                    ...answers,
                    ["Stalstomme med synliga balkar och pelare finns"]: "nej",
                  })
                }
                {...getRadioButtonStyleProps()}
                size={15}
              />
            </View>
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Nettoarea A</Text>
            <ChapterInput
              value={answers["Nettoarea A"]}
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["Nettoarea A"]: text,
                });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>
              Antal skyddsplatser B utifrản nettoarean:
            </Text>
            <ChapterInput
              value={answers["Antal skyddsplatser B utifrản nettoarean"]}
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["Antal skyddsplatser B utifrản nettoarean"]: text,
                });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>
              Antal skyddsplatser C utifrån ventilationssystemet:
            </Text>
            <ChapterInput
              value={
                answers["Antal skyddsplatser C utifrản ventilationssystemet"]
              }
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["Antal skyddsplatser C utifrản ventilationssystemet"]: text,
                });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Minsta värdet av B och C:</Text>
            <ChapterInput
              value={answers["Minsta värdet av B och C"]}
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["Minsta värdet av B och C"]: text,
                });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>
              Antal skyddsplatser E enligt skyddsrumsregistret:
            </Text>
            <ChapterInput
              value={
                answers["Antal skyddsplatser E enligt skyddsrumsregistret"]
              }
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["Antal skyddsplatser E enligt skyddsrumsregistret"]: text,
                });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>
              Dimensionerande antal skyddsplatser F:
            </Text>
            <ChapterInput
              value={answers["Dimensionerande antal skyddsplatser F"]}
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["Dimensionerande antal skyddsplatser F"]: text,
                });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Kontrolldatum:</Text>
            <ChapterInput
              value={answers["Kontrolldatum"]}
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["Kontrolldatum"]: text,
                });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Godkännandedatum:</Text>
            <ChapterInput
              value={answers["Godkännandedatum"]}
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["Godkännandedatum"]: text,
                });
              }}
            />
          </View>
          <View style={styles.answerGroup}>
            <Text style={styles.textField}>Kontrollantens SRG-nr:</Text>
            <ChapterInput
              value={answers["Kontrollantens SRG-nr"]}
              onChangeText={(text) => {
                setAnswers({
                  ...answers,
                  ["Kontrollantens SRG-nr"]: text,
                });
              }}
            />
          </View>
        </View>
        <MyButton
          title={"Submit"}
          loading={isChapterSubmitting}
          onPress={async () => {
            try {
              setIsChapterSubmitting(true);
              // console.log("Before writing");
              await writeRealtimeDocument(
                `${userId}/${answers["Skyddsrumsnummer"]}/chapter0`,
                answers
              );
              setIsChapterSubmitting(false);
              Updates.reloadAsync();

              //   navigation.navigate("InspectionListScreen", {
              //     userId: "userid2",
              //   });
            } catch (e) {
              console.log(e);
              setIsChapterSubmitting(false);
            }
          }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  answerGroup: {
    flexDirection: "row",
    margin: 3,
  },

  textField: {
    paddingVertical: 10,
    paddingHorizontal: 3,
    borderWidth: 1,
    marginRight: 1,
    borderRadius: 3,
    alignSelf: "center",
    fontWeight: "600",
    maxWidth: 200,
  },
});
