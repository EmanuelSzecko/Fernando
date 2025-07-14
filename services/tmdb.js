
const API_KEY = 'dd549f500ef9d4ea43c748bfec0cfa06'; // substitua pela sua chave real da TMDB
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
    if (!response.ok) {
      console.error('❌ Erro ao buscar filmes:', response.status);
      return [];
    }

    const json = await response.json();
    console.log('✅ Filmes carregados:', json.results);
    return json.results;
  } catch (error) {
    console.error('❌ Erro na chamada da API TMDB:', error);
    return [];
  }
}
