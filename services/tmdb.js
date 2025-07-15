const API_KEY = 'dd549f500ef9d4ea43c748bfec0cfa06';
const BASE_URL = 'https://api.themoviedb.org/3';
import axios from "axios";
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR'
  }
});


export const getPopularMovies = async () => {
  const response = await api.get('/movie/popular');
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await api.get('/search/movie', {
    params: { query }
  });
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

export const getImageUrl = (path, size = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
