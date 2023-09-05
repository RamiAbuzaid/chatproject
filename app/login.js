import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [infoData, setInfoData] = useState({});

  const navigation = useNavigation();

  const checkIfAuth = () =>
    infoData.status === 200 &&
    infoData.message === "Successfully authenticated";

  const submittedData = async () => {
    const loginInfo = {
      username,
      password,
    };

    const response = await axios.post(
      "https://chat-api-with-auth.up.railway.app/auth/token",
      loginInfo
    );
    const data = await response.data;
    console.log(data)
    if (data) setInfoData(data);
    if(checkIfAuth) navigation.navigate("chat")
  };

  return (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.textHeader}>
              {infoData.message ?? "Enter username and password"}
            </Text>
            <TextInput
              type="text"
              placeholder="Username"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable style={styles.button} onPress={submittedData}>
              <Text style={styles.text}>Login</Text>
            </Pressable>
          </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: 250,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  textHeader: {
    fontSize: 15,
    color: "black",
    padding: 10,
    height: 50,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
