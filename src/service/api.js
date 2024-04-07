import axios from 'axios';

const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjk0NWFiM2EwNTFkZDU3NGFkZDk5NGYzODM2MzQ2ZCIsInN1YiI6IjY2MTJhZTQwMTk2OTBjMDE3Y2E1NGQxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t-zolryQZCoz8mehPlzav8WOYqJkjLZ2uOsl_2uwRbQ';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;

const instance = axios.create();

export const fetchTrending = async () => {
  const {
    data: { results },
  } = await instance.get('trending/movie/week');
  const trendingList = results.map((movie) => {
    return {
      ...movie,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    };
  });
  console.log('Trending', trendingList);
  return trendingList;
};

export const fetchMovieById = async (id) => {
  const { data } = await instance.get(`movie/${id}`);
  const movie = {
    ...data,
    poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
  };
  console.log(`By id = ${id}`, movie);
  return movie;
};

export const fetchMovieByKeyword = async (keyword) => {
  const {
    data: { results },
  } = await instance.get(`search/movie?query=${keyword}`);
  const movieList = results.map((movie) => {
    return {
      ...movie,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    };
  });
  console.log(`By keyword = ${keyword}`, movieList);
  return movieList;
};

export const fetchMovieCredits = async (id) => {
  const {
    data: { cast },
  } = await instance.get(`movie/${id}/credits`);
  console.log(`Cast by movie id = ${id}`, cast);
  return cast;
};

export const fetchMovieReviews = async (id) => {
  const {
    data: { results: reviews },
  } = await instance.get(`movie/${id}/reviews`);
  console.log(`Reviews by movie id = ${id}`, reviews);
  return reviews;
};

fetchTrending();
fetchMovieById(693134);
fetchMovieByKeyword('Dune');
fetchMovieCredits(693134);
fetchMovieReviews(693134);
