import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Alert,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.56.1:3000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "you have been registered successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration failed",
          "An error occurred during registration"
        );
        console.log("error", error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/EzTalk_Logo01.png')} // Replace 'your-image-name.png' with the actual file name
          />
        </View>
        <KeyboardAvoidingView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Register to Your Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons style={{ marginLeft: 8, color: 'gray' }} name="person" size={24} />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholderTextColor={"gray"}
              style={styles.input}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons style={{ marginLeft: 8, color: 'gray' }} name="email" size={24} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={"gray"}
              style={styles.input}
              placeholder="Enter your email"
            />
          </View>

          <View style={styles.inputWrapper}>
            <AntDesign style={{ marginLeft: 8, color: 'gray' }} name="lock" size={24} />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={"gray"}
              style={styles.input}
              placeholder="Enter your password"
            />
          </View>
        </View>

        <Pressable onPress={handleRegister} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Register</Text>
        </Pressable>

        <View style={styles.signUpTextContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.signUpText}>Already have an account? Sign In</Text>
          </Pressable>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
    alignItems: "center"
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Aligns content to the top
  },
  
  logoContainer: {
    marginTop: 20,
    width: '100%', // Ensures the container takes the full width
    alignItems: 'center', // Centers children horizontally in the container
  },
  logo: {
    width: 250,
    height: 200,
    resizeMode: "contain"
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5, // Reduced space between logo and title
  },
  
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 25,
    color: "white" // White text for visibility on dark background
  },
  inputContainer: {
    marginTop: 20
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "turquoise",
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 30
  },
  input: {
    color: "white", // White text for visibility
    marginVertical: 10,
    width: 300,
    fontSize: 16
  },
  loginOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12
  },
  loginButton: {
    width: 200,
    backgroundColor: "turquoise", // Dark orange button
    padding: 15,
    marginTop: 40,
    alignSelf: "center",
    borderRadius: 6
  },
  loginButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "black" // Black text for contrast with dark orange button
  },
  signUpTextContainer: {
    marginTop: 10
  },
  signUpText: {
    textAlign: "center",
    fontSize: 16,
    color: "white" // White text for visibility
  }
});


export default RegisterScreen;


