import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import Header from './components/header/Header';
import MovieList from './components/movieList/MovieList';

import FavoriteMovies from "./components/favoriteMovies/FavoriteMovies"
import WantToSee from "./components/wantToSee/WantToSee"


function App() {

const [favoriteMovies, setFavoriteMovies] = useState([]); // Новое состояние для избранных фильмов
const [movies, setMovies] = useState([]);
const [watchListMovies, setWatchListMovies] = useState([]);

const [pageTitle, setPageTitle] = useState('Популярные фильмы');

const updateMovieList = (newMovies) => {
  setMovies(newMovies);
};

const updateFavoriteMovieList = (newMovies) => {
  setFavoriteMovies(newMovies);
};

const updateWatchListMovies = (newMovies) => {
  setWatchListMovies(newMovies)
};

  const API_URL = "https://api.themoviedb.org/3/movie/popular?language=ru-RU&api_key=c57a2c290fd9468897e95de638df5bb9";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);


  return (
    <Router>
        <div className="App">
          <Header updateMovieList={updateMovieList} updateFavoriteMovieList={updateFavoriteMovieList} updateWatchListMovies={updateWatchListMovies} pageTitle={pageTitle} />
          <Routes>
            <Route path="/popular" element={<MovieList movies={movies} updateMovieList={updateMovieList} setPageTitle={setPageTitle} />} />
            <Route path="/want-to-see" element={<WantToSee watchListMovies={watchListMovies} updateWatchListMovies={updateWatchListMovies} setPageTitle={setPageTitle} />} />
            <Route path="/favorite-movies" element={<FavoriteMovies favoriteMovies={favoriteMovies} updateFavoriteMovieList={updateFavoriteMovieList} setPageTitle={setPageTitle}  />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
