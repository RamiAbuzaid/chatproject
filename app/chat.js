import { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

    const getAllMessages = useCallback(async () => {

        const userData = JSON.parse(await AsyncStorage.getItem("user"));
        console.log(userData,"jejejej");
        const token = userData.data.accessToken;
        console.log(token, "kskksks");
        try {
            const {data} = await axios(
              "https://chat-api-with-auth.up.railway.app/messages/", 
             {
                headers: {
                    'Authorization': `Bearer ${token}` 
                  }
             }
            );
            console.log(data, "heheee");
            if (data) setMessages(data);
          } catch (e) {
            setErrorMessage(e.messages);
          }
    }, [])

  useEffect(() => {
    getAllMessages();

    return () => {
        
    }
  }, []);

  console.log(messages, "sksksksk")

  return (
    <View>
      {messages?.data?.map((message) => (
        <View key={message._id}>
          <Text>{message.content}</Text>
          <Text>{message.username}</Text>
        </View>
      ))}
    </View>
  );
}
