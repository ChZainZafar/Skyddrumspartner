import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContext, UserProvider } from "./src/context/UserContext.js";
import { useContext } from "react";
import SignupScreen from "./src/screens/SignupScreen.js";
import SigninScreen from "./src/screens/SigninSceen.js";
import ChapterListScreen from "./src/screens/ChapterListScreen.js";
import ChapterScreen from "./src/screens/ChapterScreen.js";
import InspectionListScreen from "./src/screens/InspectionListScreen.js";
import ChapterZeroScreen from "./src/screens/ChapterZeroScreen.js";
import { Image, Text, View } from "react-native";
import logo from "./src/assets/logo.jpg";
const Stack = createNativeStackNavigator();

export function App() {
  function LogoTitle() {
    return (
      <Image
        style={{ width: 60, height: 60 }}
        source={logo} // Make sure to replace 'path-to-your-logo.png' with the actual path to your logo image
      />
    );
  }
  const { isAdmin } = useContext(UserContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          headerTitle: "Sign up",
        }}
      />
      <Stack.Screen
        name="SigninScreen"
        component={SigninScreen}
        // options={{ headerShown: false }}
        options={{
          headerTitle: "Sign in",
        }}
      />
      <Stack.Screen
        name="InspectionListScreen"
        component={InspectionListScreen}
        initialParams={{ userId: "userid2" }}
        // options={{ headerShown: false }}
        options={{
          headerTitle: (props) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Text>Inspections</Text>
              <LogoTitle {...props} />
              {/* Ensure Text is imported from react-native */}
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="ChapterListScreen"
        component={ChapterListScreen}
        options={{
          headerTitle: "Chapters",
        }}
      />
      <Stack.Screen
        name="ChapterScreen"
        component={ChapterScreen}
        // options={{ headerShown: false }}
        options={{
          headerTitle: "Chapter",
        }}
      />

      <Stack.Screen
        name="ChapterZeroScreen"
        component={ChapterZeroScreen}
        // options={{ headerShown: false }}
        options={{
          headerTitle: "Chapter",
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <UserProvider>
      <NavigationContainer independent={true}>
        <App />
      </NavigationContainer>
    </UserProvider>
  );
};
