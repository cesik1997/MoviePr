import React, { useState, useEffect } from 'react';
import MovieCard from '../movieCard/MovieCard';
import { addToWatchList, removeFromFavorites } from '../services/MovieService';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTdhMmMyOTBmZDk0Njg4OTdlOTVkZTYzOGRmNWJiOSIsInN1YiI6IjY1MDAwYTNhZDdkY2QyMDBhY2IwMjAzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ungifeWLj9mMk0oV0WbLX6UW7R8frGLgQ9M--UQM1e0'; 

const FavoriteMovies = (props) => {
  const { favoriteMovies, updateFavoriteMovieList, setPageTitle } = props;

  const [currentPage, setCurrentPage] = useState(0); 
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setPageTitle("Избранные фильмы")
  }, [setPageTitle])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}` 
      }
    };
    // Загрузка избранных фильмов при монтировании компонента
    if (currentPage === 0) { // условие для первой страницы
      fetch(`https://api.themoviedb.org/3/account/20427866/favorite/movies?language=ru-RU&page=1`, options)
        .then((res) => res.json())
        .then((data) => {
          console.log(updateFavoriteMovieList)
          updateFavoriteMovieList(data.results);
          setCurrentPage(1); // Обновление страницы на 1 после успешной загрузки первой страницы
        })
        .catch((error) => {
          console.error("Error loading data:", error);
        });
    }
  }, [currentPage, updateFavoriteMovieList]);


  function loadMoreFavoriteMovies() {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    const nextPage = currentPage + 1;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}` 
      }
    };

    // Загрузка следующей страницы избранных фильмов
    fetch(`https://api.themoviedb.org/3/account/20427866/favorite/movies?language=ru-RU&page=${nextPage}`, options)
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingMore(false);
        setCurrentPage(nextPage);
        updateFavoriteMovieList((prevFavoriteMovies) => [...prevFavoriteMovies, ...data.results]);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setIsLoadingMore(false);
      });
  }

  const removeFromFavoritesAndUpdateList = async (movieId) => {
    try {
      const response = await removeFromFavorites(movieId);
      if (response.success) {
        const updatedFavoriteMovies = favoriteMovies.filter((movie) => movie.id !== movieId);
        updateFavoriteMovieList(updatedFavoriteMovies);
      }
    } catch (error) {
      console.error('Ошибка при удалении фильма из избранного:', error);
    }
  };

  return (
    <div className="pageContainer">
      <div className="pageContainer-inner">
        <div className="gallery">

          <ul className="gallery__list">
            {favoriteMovies.map((movie) => (
              <li key={movie.id} className="gallery__item">
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  poster_path={movie.poster_path}
                  genre_ids={movie.genre_ids}
                  release_date={movie.release_date}
                  isFavorite={true}
                  removeFromFavoritesAndUpdateList={removeFromFavoritesAndUpdateList}
                  addToWatchList={addToWatchList}
                />
              </li>
            ))}
            <div className="moreButton">
              <button className='loadMoreButton' onClick={loadMoreFavoriteMovies}>
                Показать еще
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FavoriteMovies;