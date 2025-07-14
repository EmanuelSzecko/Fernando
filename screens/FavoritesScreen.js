import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchFavs = async () => {
        const data = await AsyncStorage.getItem("favorites");
        setFavorites(data ? JSON.parse(data) : []);
      };
      fetchFavs();
    }, [])
  );

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.poster}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { margin: 10, alignItems: "center" },
  poster: { width: 200, height: 300, borderRadius: 10 },
  title: { fontWeight: "bold", textAlign: "center", marginTop: 5 },
});
