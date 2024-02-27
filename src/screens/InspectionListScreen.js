import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import { GetRealtimeDocuments } from "../config/firebase";
import Icon from "react-native-vector-icons/MaterialIcons";
import answers0 from "../chapters/answers0.json";
import Seperator from "../components/Seperator";
import logo from "../assets/logo.jpg";
export default function InspectionListScreen({ navigation, route }) {
  const { userId } = route.params;
  const [inspections, setInspections] = useState(null);

  //   console.log("inspections", inspections);

  async function getInspections() {
    const userInspections = await GetRealtimeDocuments(`${userId}`);
    setInspections(
      Object.entries(userInspections.val()).map(([key, value]) => ({
        key,
        value,
      }))
    );
  }
  useEffect(() => {
    getInspections();
  }, []);

  return (
    <>
      <Image style={{ height: 200, width: "100%" }} source={logo} />
      <Seperator />
      <FlatList
        data={inspections}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  // console.log(item.value);
                  navigation.navigate("ChapterListScreen", {
                    inspectionRt: item.value,
                    userId: userId,
                    inspectionId: item.key,
                  });
                }}
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingHorizontal: 16,
                }}
              >
                <Text style={{ fontSize: 16 }}>{item.key}</Text>
              </TouchableOpacity>
              <Seperator />
            </>
          );
        }}
      />
      <Icon
        name="add-circle"
        size={50}
        style={{ position: "absolute", bottom: 20, right: 20 }}
        onPress={async () => {
          navigation.navigate("ChapterZeroScreen", {
            answersP: answers0,
            userId: userId,
            inspectionId: "insId",
          });
        }}
      />
    </>
  );
}
