import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      const json = await AsyncStorage.getItem('@filmesFavoritos');
      const data = json ? JSON.parse(json) : [];
      setFavoritos(data);
    } catch (e) {
      console.log('Erro ao carregar favoritos:', e);
    }
  };

  const removerFavorito = async (id) => {
    const novos = favoritos.filter((item) => item.id !== id);
    setFavoritos(novos);
    await AsyncStorage.setItem('@filmesFavoritos', JSON.stringify(novos));
    Alert.alert('Removido', 'Filme removido dos favoritos.');
  };

  if (favoritos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎥 Favoritos</Text>
        <Text style={styles.vazio}>Você ainda não adicionou nenhum filme.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Meus Favoritos</Text>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.poster_path ? (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.poster}
              />
            ) : (
              <Text style={styles.noImage}>Sem imagem</Text>
            )}
            <Text style={styles.movieTitle}>{item.title}</Text>

            <TouchableOpacity
              style={styles.btnRemover}
              onPress={() => removerFavorito(item.id)}
            >
              <Text style={styles.btnText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#0077b6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  vazio: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  btnRemover: {
    backgroundColor: '#0077b6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noImage: {
    color: '#ccc',
    textAlign: 'center',
    paddingVertical: 20,
  },
});
