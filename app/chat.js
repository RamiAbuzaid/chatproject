import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [createMessageStatus, setCreateMessageStatus] = useState("");
  const [currentUserID, setCurrentUserID] = useState("");

  const getAllMessages = useCallback(async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    const token = userData.data.accessToken;
    const currentUserId = userData.data._id;

    try {
      const { data } = await axios(
        "https://chat-api-with-auth.up.railway.app/messages/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) setMessages(data);

      setCurrentUserID(currentUserId);
    } catch (e) {
      setErrorMessage(e.messages);
    }
  }, []);

  useEffect(() => {
    getAllMessages();

    return () => {};
  }, []);

  const sendMessage = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    const token = userData.data.accessToken;
    const message = {
      content: messageInput,
    };
    try {
      const response = await axios.post(
        "https://chat-api-with-auth.up.railway.app/messages",
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      setCreateMessageStatus(data);
      if (data) getAllMessages();
    } catch (e) {
      console.warn(e.message);
    }
  };

  return (
    <View>
      <ScrollView style={{ marginBottom: 120 }}>
        {messages?.data?.map((message) => (
          <View key={message._id} style={styles.textContainer}>
            <Text
              style={
                message?.user?._id === currentUserID
                  ? styles.myText
                  : message?.user?._id !== currentUserID && styles.text
              }
            >
              {message.content}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TextInput
          value={messageInput}
          placeholder="Write something..."
          style={styles.input}
          onChangeText={setMessageInput}
        />
        <Button title="Send message" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: 420,
    right: 0,
    fontSize: 22,
    padding: 10,
    textAlign: "right",
    backgroundColor: "lightgray",
  },
  textContainer: {
    width: 400,
    height: 50,
  },
  text: {
    backgroundColor: "lightblue",
    height: 30,
    margin: 4,
    borderRadius: 5,
    fontSize: 20,
    textAlign: "left",
  },
  myText: {
    backgroundColor: "pink",
    height: 30,
    margin: 4,
    borderRadius: 5,
    fontSize: 20,
    textAlign: "right",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
  },
});
