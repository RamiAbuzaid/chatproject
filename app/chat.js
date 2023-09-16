import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TextInput,
  LongPressGestureHandler,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [createMessageStatus, setCreateMessageStatus] = useState("");
  const [currentUserID, setCurrentUserID] = useState("");
  const [removeMessage, setRemoveMessage] = useState("");

  const getAllMessages = useCallback(async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    const token = userData.data?.accessToken;
    const currentUserId = userData?.data?._id;

    console.log(userData, "ekeek");

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

    const chatVisible = async () => {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      console.log(userData);

      if (!userData.data) setMessages("");
    };
    chatVisible();
  }, []);

  const sendMessage = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    const token = userData.data?.accessToken;
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

  const deleteMessage = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    const token = userData.data?.accessToken;
    try {
      await axios.delete(
        `https://chat-api-with-auth.up.railway.app/messages/${removeMessage}
    `,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllMessages();
    } catch (error) {
      console.warn(error.message);
    }
  };

  const handleSingleTap = (evt) => {
    if (evt.nativeEvent.state === State.ACTIVE) {
      Alert?.alert("Delete", "Are you sure you want to delete this post?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteMessage(),
        },
      ]);
    }
  };
  

  return (
    <View>
      {messages?.data?.length !== 0 ? (
        <View>
          <ScrollView style={{ marginBottom: 120 }}>
            {messages?.data?.map((message) => (
              <TapGestureHandler
                key={message._id}
                onHandlerStateChange={
                  message?.user?._id === currentUserID ? handleSingleTap : ""
                }
              >
                <View style={styles.textContainer}>
                  <Text
                    onPress={() =>
                      setRemoveMessage(
                        message?.user?._id === currentUserID
                          ? message._id
                          : null
                      )
                    }
                    style={
                      message?.user?._id === currentUserID
                        ? styles.myText
                        : message?.user?._id !== currentUserID && styles.text
                    }
                  >
                    {message.content}
                  </Text>
                </View>
              </TapGestureHandler>
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
      ) : (
        <View>
          <Text>Please log in to see this page</Text>
        </View>
      )}
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
  notLoggedinText: {
    textAlign: "center",
    marginTop: 400,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
  },
  postContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
  },
});
