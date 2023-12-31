import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [user, setUser] = useState("");
  const navigation = useNavigation()
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.56.1:3000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProfile();
  });

  const logout = () => {
      clearAuthToken();
  }
  const clearAuthToken = async () => {
      await AsyncStorage.removeItem("authToken");
      console.log("Cleared auth token");
      navigation.replace("Login")
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>{user?.name}</Text>
        <View style={styles.badge}>
          <Text>EzTalk ~Istanbul Aydin University~ Mobile App </Text>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.infoText}>Abdulmalek.</Text>
          <Text style={styles.infoText}>Software Engineer</Text>
          <Text style={styles.infoText}>Love musics & sports</Text>
        </View>
      </View>

      <Text style={styles.followersCount}>
        {user?.followers?.length} followers
      </Text>

      <View style={styles.buttonsContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : {},
        ]}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>

      <Pressable
        onPress={logout}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : {},
        ]}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    paddingTop: Platform.OS === 'ios' ? 44 : 0, // Extra padding for iOS, adjust the value as needed
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'turquoise', // Theme color for the border
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for dark theme
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    backgroundColor: 'turquoise', // Theme color for the badge
    marginTop: 8, // Add space above the badge if needed
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    borderColor: 'turquoise', // Theme color for the image border
    borderWidth: 2,
  },
  userInfo: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#FFFFFF', // White text for dark theme
    textAlign: 'center', // Center the text if needed
  },
  followersCount: {
    color: 'gray',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center', // Center the text if needed
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderColor: 'turquoise',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    backgroundColor: 'turquoise', // Yellow color for the pressed state
  },
});


export default ProfileScreen;