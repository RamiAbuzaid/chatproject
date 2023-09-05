import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import axios from 'axios';


export default function Register(){
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [infoData, setInfoData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
  
    const navigation = useNavigation();
  
    const checkIfRegistered = () =>
      infoData.status === 200 &&
      infoData.message === "Successfully registered";
  
    const submittedData = async () => {
      try {
        const registerInfo = {
            username: newUsername,
            password: newPassword,
        };
  
        const response = await axios.post(
          "https://chat-api-with-auth.up.railway.app/auth/register",
          registerInfo
        );
        const data = await response.data;
        if (data) setInfoData(data);
        if (checkIfRegistered) navigation.navigate("login");
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };
    return(
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.textHeader}>{errorMessage ? errorMessage : ""}</Text>
        <TextInput
          type="text"
          placeholder="Username"
          style={styles.input}
          value={newUsername}
          onChangeText={setNewUsername}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Pressable style={styles.button} onPress={submittedData}>
          <Text style={styles.text}>Register</Text>
        </Pressable>
      </View>
    )
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
      color: "red",
      fontWeight: "bold",
      padding: 10,
      height: 50,
    },
    text: {
      fontSize: 15,
      fontWeight: "bold",
      color: "white",
    },
  });
  