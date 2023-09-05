import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import Login from "./login";
import Register from "./login";
import Chat from "./chat";

export default function Home() {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <View>
      <View style={{marginTop: 100}}>
        <Button title="Login" onPress={() => navigation.navigate("login")} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("register")}
      />
      </View>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </View>
  );
}
