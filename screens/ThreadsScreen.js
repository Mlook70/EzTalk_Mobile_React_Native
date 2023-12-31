import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useContext } from "react";
import { UserType } from "../UserContext";
import axios from "axios";

const ThreadsScreen = () => {
  const { userId } = useContext(UserType);
  const [content, setContent] = useState("");

  const handlePostSubmit = () => {
    const postData = {
      userId,
      content,
    };

    Keyboard.dismiss(); // Dismiss the keyboard upon submitting

    if (content) {
      axios
        .post("http://172.20.10.2:3000/create-post", postData)
        .then((response) => {
          setContent("");
        })
        .catch((error) => {
          console.log("error creating post", error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.userImage}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />
        <Text style={styles.usernameText}>Abdulmalek</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={setContent}
          placeholderTextColor={"#FAB713"}
          placeholder="Type your message..."
          multiline
        />
      </View>

      <TouchableOpacity onPress={handlePostSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Share Post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark theme background color
    padding: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
  },
  usernameText: {
    color: '#FFFFFF', // White text color for readability
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    margin: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF', // White text color for readability
    backgroundColor: '#1E1E1E', // Slightly lighter dark shade for input
    borderRadius: 5,
    padding: 10,
    borderColor: '#FAB713', // Accent color for border
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#FAB713', // Accent color for the button
    padding: 15,
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 6,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "black", // Black text color for contrast
  },
});

export default ThreadsScreen;
