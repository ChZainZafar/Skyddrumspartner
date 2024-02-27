import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { getRadioButtonStyleProps } from "../commonFunctions";
import MyButton from "./MyButton";
import Seperator from "./Seperator";
import TextInput from "./TextInput";
import ImagePlaceholder from "../assets/ImagePlaceholder.png";
import * as ImagePicker from "expo-image-picker";

export default function Question({ question, handleAnswer }) {
  // {
  //     "question_id":"01c",
  //     "statement":"lordningställanderitning finns och stämmer med förhảllandena i skyddsrummet.",
  //     "types":"2,3",
  //     "further_options" : [
  //       "01c-1##Fel: lordningställanderitning saknas. Ätgärd: Ny iordningställanderitning skall upprättas. Se typlösning T01101.",
  //       "01c-2##Fel: lordingställanderitning överensstämmer ej med förhällandena i skyddsrummet. Ätgärd: lordingställanderitning skall justeras sả att den överensstämmer med förhallandena i skyddsrummet. Se typlösning T01-101."
  //     ]
  //   }

  // const [checked, setChecked] = useState("");
  // const [furtherOptions, setFurtherOptions] = useState([]);
  // const [comment, setComment] = useState("");
  // const [image, setImage] = useState(null);
  const [answer, setAnswer] = useState(
    question.answer
      ? question.answer
      : { questionId: question && question.question_id }
  );

  useEffect(() => {
    // console.log("answer", answer);
    handleAnswer(answer);
  }, [answer]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.2,
        allowsMultipleSelection: false,
      });
      // setImage(result.assets[0].uri);
      setAnswer({ ...answer, image: result.assets[0].uri });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ width: "100%", paddingVertical: 10, paddingHorizontal: 10 }}>
      <Text
        style={{
          alignSelf: "flex-end",
          paddingHorizontal: 5,
          marginBottom: 7,
          borderWidth: 1,
        }}
      >
        TYPES - <Text style={{ fontWeight: "bold" }}>{question.types}</Text>
      </Text>
      {/* <Seperator /> */}
      <Text style={{ fontWeight: "bold" }}>
        {question.question_id} - {question.statement}
      </Text>

      <View
        style={{
          flexDirection: "row",
          // justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <TouchableOpacity
          style={{ height: 40, width: 40, marginRight: 15 }}
          onPress={() => {
            pickImage();
          }}
        >
          {answer.image ? (
            <Image
              style={{ height: "100%", width: "100%" }}
              source={{ uri: answer.image }}
            />
          ) : (
            <Image
              style={{ height: "100%", width: "100%" }}
              source={ImagePlaceholder}
            />
          )}
        </TouchableOpacity>
        <TextInput
          label={"Comment"}
          value={answer.comment ? answer.comment : ""}
          setValue={(text) => {
            setAnswer({ ...answer, comment: text });
          }}
        />
      </View>
      {/* <Seperator /> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            title="Ja"
            checked={answer.checked ? answer.checked === "Ja" : false}
            onPress={() => setAnswer({ ...answer, checked: "Ja" })}
            {...getRadioButtonStyleProps()}
            size={16}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            title="Nej"
            checked={answer.checked ? answer.checked === "Nej" : false}
            onPress={() => setAnswer({ ...answer, checked: "Nej" })}
            {...getRadioButtonStyleProps()}
            size={16}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            title="Ej ektuell"
            checked={answer.checked ? answer.checked === "Ej ektuell" : false}
            onPress={() => setAnswer({ ...answer, checked: "Ej ektuell" })}
            {...getRadioButtonStyleProps()}
            size={16}
          />
        </View>
      </View>
      {/* <Seperator /> */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FlatList
          data={question.further_options}
          renderItem={({ item }) => {
            return (
              <CheckBox
                title={item}
                checked={
                  answer.furtherOptions
                    ? answer.furtherOptions.includes(item)
                    : false
                }
                size={16}
                onPress={() => {
                  let shouldAdd = answer.furtherOptions
                    ? !answer.furtherOptions.includes(item)
                    : true;
                  // console.log("should add", shouldAdd);
                  shouldAdd
                    ? setAnswer({
                        ...answer,
                        furtherOptions: answer.furtherOptions
                          ? [...answer.furtherOptions, item]
                          : [item],
                      })
                    : setAnswer({
                        ...answer,
                        furtherOptions: answer.furtherOptions.filter(
                          (option) => option !== item
                        ),
                      });
                }}
                // style={{ marginBottom: 5 }}
                {...getRadioButtonStyleProps()}
              />
            );
          }}
        />
      </View>
    </View>
  );
}
