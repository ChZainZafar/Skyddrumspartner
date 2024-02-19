import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContext, UserProvider } from "./src/context/UserContext.js";
import { useContext } from "react";
import SignupScreen from "./src/screens/SignupScreen.js";
import SigninScreen from "./src/screens/SigninSceen.js";
import ChapterListScreen from "./src/screens/ChapterListScreen.js";
import ChapterScreen from "./src/screens/ChapterScreen.js";

const Stack = createNativeStackNavigator();

export function App() {
  const { isAdmin } = useContext(UserContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChapterListScreen" component={ChapterListScreen} />
      <Stack.Screen name="ChapterScreen" component={ChapterScreen} />

      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
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
