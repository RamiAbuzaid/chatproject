import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  return (
<View style={{ marginTop: 100 }}>
        <Button title="Login" onPress={() => navigation.navigate("login")} />
        <Button
          title="Register"
          onPress={() => navigation.navigate("register")}
        />
      </View>
      
  );
}
