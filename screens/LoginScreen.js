import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          setTimeout(() => {
            navigation.replace("Main");
          }, 400);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.56.1:3000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.navigate("Main");
      })
      .catch((error) => {
        Alert.alert("Login error");
        console.log("error ", error);
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
          <Text style={styles.title}>Login to Your Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={24} color="gray" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="enter your Email"
              style={styles.input}
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.inputWrapper}>
            <AntDesign name="lock" size={24} color="gray" />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              placeholder="enter your Password"
              style={styles.input}
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.loginOptions}>
            <Text style={styles.signUpText}>Keep me logged in</Text>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </View>
        </View>
        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Register")} style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
        </Pressable>
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
    justifyContent: "center"
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
  forgotPassword: {
    fontWeight: "500",
    color: "turquoise" // Dark orange for the forgot password link
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



export default LoginScreen;

