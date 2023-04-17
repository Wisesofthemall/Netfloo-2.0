import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { MovieAPI, TMBDURL } from "../utils/env.js";

import axios from "axios";
// import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  video: [],
};

export const getGenres = createAsyncThunk("netfloo/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=3d39d6bfe362592e6aa293f01fbcf9b9",
  );

  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "netfloo/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      netfloo: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`,
      genres,
    );
  },
);

export const fetchMovies = createAsyncThunk(
  "netfloo/trending",
  async ({ type }, thunkAPI) => {
    const {
      netfloo: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMBDURL}/trending/${type}/week?api_key=${MovieAPI}`,
      genres,
      true,
    );
  },
);

export const getUsersLikedMovies = createAsyncThunk(
  "netfloo/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:4000/api/user/liked/${email}`);
    return movies;
  },
);

export const removeMovieFromLiked = createAsyncThunk(
  "netfloo/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:4000/api/user/remove", {
      email,
      movieId,
    });
    return movies;
  },
);

export const getYTVideo = createAsyncThunk(
  "netfloo/video",
  async ({ movieId, name }) => {
    console.log("BOOM WE HERE");
    const { data } = await axios.get("http://localhost:4000/api/user/video", {
      name: name,
      movieId: movieId,
    });
    return data;
  },
);

const NetflooSlice = createSlice({
  name: "Netfloo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getYTVideo.fulfilled, (state, action) => {
      state.video = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netfloo: NetflooSlice.reducer,
  },
});

export const { setGenres, setMovies } = NetflooSlice.actions;
