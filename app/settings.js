import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { useStore } from './store/store'; 

export default function Settings() {
  const navigation = useNavigation();

  const setHideChat = useStore((state) => state.hideChatPage);
  const setMessages = useStore((state) => state.allMessages);

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
      navigation.navigate("login");
      setHideChat(true);
      setMessages([]);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button title="Logout" onPress={logoutUser} />;
}
