import { useState } from "react";
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

export default function Question({ question, onNextPress, onPreviousPress }) {
  // {
  //     "question_id":"01c",
  //     "statement":"lordningställanderitning finns och stämmer med förhảllandena i skyddsrummet.",
  //     "types":"2,3",
  //     "further_options" : [
  //       "01c-1##Fel: lordningställanderitning saknas. Ätgärd: Ny iordningställanderitning skall upprättas. Se typlösning T01101.",
  //       "01c-2##Fel: lordingställanderitning överensstämmer ej med förhällandena i skyddsrummet. Ätgärd: lordingställanderitning skall justeras sả att den överensstämmer med förhallandena i skyddsrummet. Se typlösning T01-101."
  //     ]
  //   }

  const [checked, setChecked] = useState("");
  const [furtherOptions, setFurtherOptions] = useState([]);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.2,
        allowsMultipleSelection: false,
      });
      setImage(result.assets[0].uri);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ width: "100%", paddingVertical: 10, paddingHorizontal: 10 }}>
      <Text>{question.question_id}</Text>
      <Text>{question.statement}</Text>
      <Text>{question.types}</Text>
      <Seperator />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ height: 50, width: 50 }}
          onPress={() => {
            pickImage();
          }}
        >
          {image ? (
            <Image
              style={{ height: "100%", width: "100%" }}
              source={{ uri: image }}
            />
          ) : (
            <Image
              style={{ height: "100%", width: "100%" }}
              source={ImagePlaceholder}
            />
          )}
        </TouchableOpacity>
        <TextInput label={"Comment"} value={comment} setValue={setComment} />
      </View>
      <Seperator />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            title="Yes"
            checked={checked === "Yes"}
            onPress={() => setChecked("Yes")}
            {...getRadioButtonStyleProps()}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            title="No"
            checked={checked === "No"}
            onPress={() => setChecked("No")}
            {...getRadioButtonStyleProps()}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            title="Maybe"
            checked={checked === "Maybe"}
            onPress={() => setChecked("Maybe")}
            {...getRadioButtonStyleProps()}
          />
        </View>
      </View>
      <Seperator />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FlatList
          data={question.further_options}
          renderItem={({ item }) => {
            return (
              <CheckBox
                title={item}
                checked={furtherOptions.includes(item)}
                onPress={() => {
                  {
                    furtherOptions.includes(item)
                      ? setFurtherOptions(...furtherOptions, item)
                      : setFurtherOptions(
                          furtherOptions.filter((option) => option !== item)
                        );
                  }
                }}
                {...getRadioButtonStyleProps()}
              />
            );
          }}
        />
      </View>
    </View>
  );
}
