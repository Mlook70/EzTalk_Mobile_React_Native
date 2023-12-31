import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { UserType } from "../UserContext";
import User from "../components/User";

const ActivityScreen = () => {
  const [selectedButton, setSelctedButton] = useState("people");
  const [content, setContent] = useState("People Content");
  const [users, setUsers] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const handleButtonClick = (buttonName) => {
    setSelctedButton(buttonName);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`http://192.168.56.1:3000/user/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchUsers();
  }, []);
  console.log("users", users);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Activity</Text>

        <View style={styles.buttonContainer}>
          {["people", "all", "requests"].map((buttonName) => (
            <TouchableOpacity
              key={buttonName}
              onPress={() => handleButtonClick(buttonName)}
              style={[
                styles.button,
                selectedButton === buttonName && styles.selectedButton,
              ]}
            >
              <Text style={styles.buttonText}>
                {buttonName.charAt(0).toUpperCase() + buttonName.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedButton === "people" && (
          <View style={styles.usersContainer}>
            {users?.map((item, index) => (
              <User key={index} item={item} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#121212',
  },
  content: {
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal:15
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderColor: 'turquoise', // Theme color for the button border
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white', // Theme color for the button text
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButton: {
    backgroundColor: 'turquoise',
    borderWidth: 4, // More pronounced border for selected button
    borderColor: '#FFFFFF', // White border for selected button
  },
  usersContainer: {
    marginTop: 20,
  },
});

export default ActivityScreen;