import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Starter from "../components/Starter";
import MyButton from "../components/MyButton";
import * as Constants from "../constants.js";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import {
  addUser,
  sendVerificationEmail,
  signupUser,
} from "../config/firebase.js";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import man from "../assets/man.png";
import * as ImagePicker from "expo-image-picker";

export default function SignupScreen({ route, navigation }) {
  // const { userType } = route.params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const showToast = async (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 4000,
    });
  };
  async function onSignupPress() {
    if (password && confirmPassword && email && username) {
      setIsLoading(true);
      if (password != confirmPassword) {
        showToast(
          "error",
          "Password must be same!",
          "password and Confirm password must be same"
        );
        setIsLoading(false);
      } else {
        try {
          console.log("in sign up");

          const userCredential = await signupUser(email, password);
          await sendVerificationEmail(userCredential.user);
          console.log("email sent");
          await addUser(
            {
              userId: userCredential.user.uid,
              email: email,
              username: username,
              passwrod: password,
            },

            Constants.USERS_COLLECTION
          );
          setIsLoading(false);

          await showToast(
            "success",
            "You have signed up successfully!",
            "Now Verify email and then Sign in to get into the app!"
          );
          setIsLoading(false);
          setTimeout(function () {
            navigation.navigate("SigninScreen", {
              userType: "buyer",
            });
          }, 2500);
        } catch (e) {
          setIsLoading(false);

          console.log(e);
          showToast("error", "Oops!", `${e}`);
        }
      }
    } else {
      showToast(
        "error",
        "Please fill up everything!",
        "In order to sign up you have to provide all of the information."
      );
      setIsLoading(false);
    }
  }

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.2,
        allowsMultipleSelection: false,
      });

      setProfilePhoto(result.assets);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <Toast />
      <Starter>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 22, marginBottom: 20 }}>
            Tell us about yourself
          </Text>
          <View style={{ width: "100%" }}>
            {!profilePhoto ? (
              <TouchableHighlight
                style={[styles.profileImgContainer]}
                onPress={() => {
                  pickImage();
                }}
              >
                <View>
                  <Image
                    style={{ height: 100, width: 100, borderRadius: 50 }}
                    source={man}
                  />
                  <Icon
                    name="add"
                    size={35}
                    color={Constants.THEME_COLOR}
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 3,
                      alignSelf: "flex-end",
                      zIndex: 5,
                    }}
                  />
                </View>
              </TouchableHighlight>
            ) : (
              <TouchableHighlight style={[styles.profileImgContainer]}>
                <Image
                  style={{ height: 100, width: 100, borderRadius: 50 }}
                  source={profilePhoto}
                />
              </TouchableHighlight>
            )}
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              mode="outlined"
              selectionColor={Constants.THEME_COLOR}
              underlineColor={Constants.THEME_COLOR}
              outlineColor={Constants.THEME_COLOR}
              activeOutlineColor={Constants.THEME_COLOR}
              activeUnderlineColor={Constants.THEME_COLOR}
              autoCapitalize="none"
            />

            <TextInput
              label="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              mode="outlined"
              selectionColor={Constants.THEME_COLOR}
              underlineColor={Constants.THEME_COLOR}
              outlineColor={Constants.THEME_COLOR}
              activeOutlineColor={Constants.THEME_COLOR}
              activeUnderlineColor={Constants.THEME_COLOR}
              autoCapitalize="none"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              mode="outlined"
              selectionColor={Constants.THEME_COLOR}
              underlineColor={Constants.THEME_COLOR}
              outlineColor={Constants.THEME_COLOR}
              activeOutlineColor={Constants.THEME_COLOR}
              activeUnderlineColor={Constants.THEME_COLOR}
              autoCapitalize="none"
            />
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              mode="outlined"
              selectionColor={Constants.THEME_COLOR}
              underlineColor={Constants.THEME_COLOR}
              outlineColor={Constants.THEME_COLOR}
              activeOutlineColor={Constants.THEME_COLOR}
              activeUnderlineColor={Constants.THEME_COLOR}
              autoCapitalize="none"
            />
            <MyButton
              title={"Signup"}
              onPress={() => {
                onSignupPress();
              }}
              loading={isLoading}
              disabled={isLoading}
            />
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() => {
                navigation.navigate("SigninScreen", {
                  userType: "buyer",
                });
              }}
            >
              <Text
                style={{
                  color: Constants.THEME_COLOR,
                  alignSelf: "flex-end",
                  fontSize: 14,
                }}
              >
                Already have an account? Sign in instead
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Starter>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImgContainer: {
    // marginLeft: 8,
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
    alignSelf: "center",
  },
});
