import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";

export default function Settings() {


  const navigation = useNavigation();

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
      navigation.navigate("login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button title="Logout" onPress={logoutUser} />
  );
}
