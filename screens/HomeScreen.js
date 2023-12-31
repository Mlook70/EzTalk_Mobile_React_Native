import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://192.168.56.1:3000/get-posts");
      setPosts(response.data);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  console.log("posts", posts);
  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `http://192.168.56.1:3000/posts/${postId}/${userId}/like`
      );
      const updatedPost = response.data;

      const updatedPosts = posts?.map((post) =>
        post?._id === updatedPost._id ? updatedPost : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error liking the post", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await axios.put(
        `http://192.168.56.1:3000/posts/${postId}/${userId}/unlike`
      );
      const updatedPost = response.data;
      // Update the posts array with the updated post
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      console.log("updated ",updatedPosts)
    
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={require('../assets/EzTalk_Logo01.png')} // Replace 'your-image-name.png' with the actual file name
      />
      </View>

      <View style={styles.postsContainer}>
        {posts?.map((post) => (
          <View key={post._id} style={styles.post}>
            <Image
              style={styles.userAvatar}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
              }}
            />
            <View>
              <Text style={styles.userName}>{post?.user?.name}</Text>
              <Text>{post?.content}</Text>
              <View style={styles.interactionRow}>
                {post?.likes?.includes(userId) ? (
                  <AntDesign
                    onPress={() => handleDislike(post?._id)}
                    name="heart"
                    size={18}
                    color="red"
                  />
                ) : (
                  <AntDesign
                    onPress={() => handleLike(post?._id)}
                    name="hearto"
                    size={18}
                    color="black"
                  />
                )}

                <FontAwesome name="comment-o" size={18} color="black" />
                <Ionicons name="share-social-outline" size={18} color="black" />
              </View>

              <Text style={styles.interactionText}>
                {post?.likes?.length} likes • {post?.replies?.length} reply
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#121212",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  postsContainer: {
    marginTop: 20,
  },
  post: {
    padding: 15,
    borderColor: "#FAB713",
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  interactionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
  },
  interactionText: {
    marginTop: 7,
    color: "#FAB713",
  },
});

export default HomeScreen;