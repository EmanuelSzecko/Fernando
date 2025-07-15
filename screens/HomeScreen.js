// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import { getPopularMovies, getImageUrl } from '../services/tmdb';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [filmes, setFilmes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      const data = await getPopularMovies();
      setFilmes(data);
    }
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
    >
      <Image
        source={{ uri: getImageUrl(item.poster_path) }}
        style={styles.image}
      />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingTop: 10
  },
  list: {
    paddingBottom: 20
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 8,
    margin: 6,
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center'
  },
  image: {
    height: 220,
    width: '100%'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 8,
    fontSize: 14
  }
});
