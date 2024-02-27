import { Text, TouchableOpacity, View } from "react-native";
import Starter from "../components/Starter";
import MyButton from "../components/MyButton";
import { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import * as Constants from "../constants.js";
import Toast from "react-native-toast-message";
import { signinUser } from "../config/firebase.js";
import { UserContext } from "../context/UserContext.js";
export default function SigninScreen({ route, navigation }) {
  // const { userType } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAdmin } = useContext(UserContext);
  const showToast = async (type, text1, text2) => {
    console.log("in showToast");
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 2500,
    });
  };

  async function onSigninPress() {
    //TODO: show loading
    setIsLoading(true);

    if (email && password) {
      setIsAdmin(false);
      try {
        const userCredential = await signinUser(email, password);
        if (userCredential.user.emailVerified) {
          console.log("verified");
          await showToast(
            "success",
            "You have signed in successfully!",
            "Welcome to Insectors"
          );
          // if (email == "aqeelzafar195@gmail.com" && password == "12345678") {
          //   setIsAdmin(true);
          //   navigation.navigate("Home");
          // } else {
          setTimeout(function () {
            navigation.navigate("InspectionListScreen");
            // navigation.navigate("Home");
          }, 2500);
          console.log("signed in");
        }
        // } else {
        //   showToast("error", "Email not verified");
        //   setIsLoading(false);
        // }
      } catch (e) {
        // setErr(e);
        setIsLoading(false);
        console.log(e);
        if (e.message) {
          const errorMessage = e.message.split("(")[1].split(")")[0];

          showToast("error", "Oops!", `${errorMessage}`);
        } else {
          showToast("error", "Oops!", `${e}`);
        }
      }
    } else {
      setIsLoading(false);
      showToast(
        "error",
        "Please provide email and password",
        "In order to sign in, we need your credentials"
      );
    }
  }

  return (
    <View>
      <Toast style={{ zIndex: 1000 }} />
      <Starter>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22, marginBottom: 20 }}>
            Sign in
          </Text>
          <View style={{ width: "100%" }}>
            <TextInput
              label="email"
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
              label="password"
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

            <MyButton
              title={"Sign in"}
              onPress={() => {
                onSigninPress();
              }}
              loading={isLoading}
              disabled={isLoading}
            />
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() => {
                navigation.navigate("SignupScreen");
              }}
            >
              <Text
                style={{
                  color: Constants.THEME_COLOR,
                  alignSelf: "flex-end",
                  fontSize: 14,
                }}
              >
                Dont have an account? Sign up instead
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Starter>
    </View>
  );
}
