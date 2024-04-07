import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3/';
const apiAccessToken =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjk0NWFiM2EwNTFkZDU3NGFkZDk5NGYzODM2MzQ2ZCIsInN1YiI6IjY2MTJhZTQwMTk2OTBjMDE3Y2E1NGQxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t-zolryQZCoz8mehPlzav8WOYqJkjLZ2uOsl_2uwRbQ';

const instance = axios.create({
  baseURL: baseURL,
  headers: { Authorization: apiAccessToken },
});

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
  return trendingList;
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
  return movieList;
};

export const fetchMovieById = async (id) => {
  const { data } = await instance.get(`movie/${id}`);
  const movie = {
    ...data,
    poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
  };
  return movie;
};

export const fetchMovieCast = async (id) => {
  const {
    data: { cast: castList },
  } = await instance.get(`movie/${id}/credits`);
  const cast = castList.map(({ name, character, profile_path }) => {
    return {
      name,
      character,
      image: `https://image.tmdb.org/t/p/w200${profile_path}`,
    };
  });
  return cast;
};

export const fetchMovieReviews = async (id) => {
  const {
    data: { results: reviews },
  } = await instance.get(`movie/${id}/reviews`);
  return reviews;
};
