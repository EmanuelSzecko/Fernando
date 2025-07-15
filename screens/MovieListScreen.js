// screens/MovieListScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Keyboard
} from 'react-native';
import { searchMovies, getPopularMovies, getImageUrl } from '../services/tmdb';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';



export default function MovieListScreen() {
  const [query, setQuery] = useState('');
  const [filmes, setFilmes] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    carregarPopulares();
  }, []);

  const carregarPopulares = async () => {
    const data = await getPopularMovies();
    setFilmes(data);
  };

  const buscarFilmes = async () => {
    Keyboard.dismiss();
    if (query.trim() === '') {
      carregarPopulares();
    } else {
      const data = await searchMovies(query);
      setFilmes(data);
    }
  };

  

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
    >
      <Image
        source={{ uri: getImageUrl(item.poster_path) }}
        style={styles.image}
      />
      <View style={styles.cardFooter}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        
      </View>
    </TouchableOpacity>
  );
  


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar filme..."
        placeholderTextColor="#888"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={buscarFilmes}
      />

      <FlatList
        data={filmes}

        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 10,
    paddingHorizontal: 12
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  list: {
    paddingBottom: 20
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 8,
    margin: 6,
    flex: 1,
    overflow: 'hidden'
  },
  image: {
    height: 220,
    width: '100%'
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8
  }
});
