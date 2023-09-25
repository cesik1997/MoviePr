import React, { useEffect, useState } from 'react';
import MovieCard from '../movieCard/MovieCard';
import { addToFavorites, addToWatchList } from '../services/MovieService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faListUl, faAngleDown} from '@fortawesome/free-solid-svg-icons'

import "./movieList.scss"

const API_URL = "https://api.themoviedb.org/3/movie/popular?language=ru-RU&api_key=c57a2c290fd9468897e95de638df5bb9&";

function MovieList(props) {
  const { movies, updateMovieList , setPageTitle } = props; 

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isYearsOpen, setIsYearsOpen] = useState(false);

  const [loadedMoviesCount, setLoadedMoviesCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const list = <FontAwesomeIcon icon={faListUl}/>
  const angle_down = <FontAwesomeIcon icon={faAngleDown}/>

  useEffect(() => {
    setPageTitle("Популярные фильмы")
  }, [setPageTitle])


  const addToFavoritesAndUpdateList = async (movieId) => {
    try {
      await addToFavorites(movieId);
    } catch (error) {
      console.error("Ошибка при добавлении фильма в избранное")
    }
  }

  const toggleGenreList = ()  => {
    setIsGenresOpen(!isGenresOpen);
  }

  const toggleYearList = ()  => {
    setIsYearsOpen(!isYearsOpen);
  }

  const toggleCountryList = ()  => {
    setIsCountryOpen(!isCountryOpen);
  }

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  }

  function loadMoreMovies() {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    const nextPage = loadedMoviesCount / 20 + 1;
    const urlWithPage = `${API_URL}&page=${nextPage}`;

    fetch(urlWithPage)
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingMore(false);
        setLoadedMoviesCount(loadedMoviesCount + 20);

        updateMovieList([...movies, ...data.results]);
      });
   
  }

  return (
    <div className="pageContainer">
      <div onClick={toggleFilters} className="filters">{list}Фильтры</div>

      <div className={`filters-container ${isFiltersOpen ? 'open' : ""}`}>
        <div className="filter-content">
          <div className="filter-list">
              <div className="filter-genres">
                <div className="filter-genres-plank">
                  <div className="filter-genres-plank-text">
                    <div className="plank-title">Жанры</div>
                    <div onClick={toggleGenreList} >{angle_down}</div>
                    <div className="plank-extra"></div>
                  </div>
                  <div className={`filterDropdown-container ${isGenresOpen ? 'open' : ""}`}>
                      <ul className="filterDropdown-list">
                        <li className="filterDropdown-item">Боевик</li>
                        <li className="filterDropdown-item">Триллер</li>
                        <li className="filterDropdown-item">Комедия</li>
                        <li className="filterDropdown-item">Ужасы</li>
                        <li className="filterDropdown-item">Приключения</li>
                        <li className="filterDropdown-item">Драма</li>
                        <li className="filterDropdown-item">Мелодрама</li>
                        <li className="filterDropdown-item">Фантастика</li>
                        <li className="filterDropdown-item">Семейный</li>
                        <li className="filterDropdown-item">Фэнтези</li>
                        <li className="filterDropdown-item">Криминал</li>
                        <li className="filterDropdown-item">Детектив</li>
                        <li className="filterDropdown-item">Военный</li>
                        <li className="filterDropdown-item">Документальный</li>
                        <li className="filterDropdown-item">Вестерн</li>
                        <li className="filterDropdown-item">Мультфильм</li>
                        <li className="filterDropdown-item">История</li>
                      </ul>
                  </div>
                </div>
              </div>
              <div className="filter-country">
              <div className="filter-country-plank">
                  <div className="filter-country-plank-text">
                    <div className="plank-title">Страны</div>
                    <div onClick={toggleCountryList} >{angle_down}</div>
                    <div className="plank-extra"></div>
                  </div>
                  <div className={`filterDropdown-container ${isCountryOpen ? 'open' : ""}`}>
                      <ul className="filterDropdown-list">
                        <li className="filterDropdown-item">США</li>
                        <li className="filterDropdown-item">Россия</li>
                        <li className="filterDropdown-item">Великобритания</li>
                        <li className="filterDropdown-item">Франция</li>
                        <li className="filterDropdown-item">Италия</li>
                        <li className="filterDropdown-item">Норвегия</li>
                        <li className="filterDropdown-item">Германия</li>
                        <li className="filterDropdown-item">Испания</li>
                      </ul>
                  </div>
                </div>
              </div>
              <div className="filter-years">
              <div className="filter-years-plank">
                  <div className="filter-years-plank-text">
                    <div className="plank-title">Годы</div>
                    <div onClick={toggleYearList} >{angle_down}</div>
                    <div className="plank-extra"></div>
                  </div>
                  <div className={`filterDropdown-container ${isYearsOpen ? 'open' : ""}`}>
                      <ul className="filterDropdown-list">
                        <li className="filterDropdown-item">2023 год</li>
                        <li className="filterDropdown-item">2022 год</li>
                        <li className="filterDropdown-item">2021 год</li>
                        <li className="filterDropdown-item">2020 год</li>
                        <li className="filterDropdown-item">2015-2020</li>
                        <li className="filterDropdown-item">2010-2015</li>
                        <li className="filterDropdown-item">2000-2010</li>
                        <li className="filterDropdown-item">до 2000</li>
                      </ul>
                  </div>
                </div>
              </div>
          </div>
              <div className="filter-button">
                
              </div>
        </div> 
      </div>

      <div className="pageContainer-inner">
        <div className="gallery">
          <ul className="gallery__list">
            {movies.map(movie => (
              <li key={movie.id} className="gallery__item">
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  poster_path={movie.poster_path}
                  genre_ids={movie.genre_ids}
                  release_date={movie.release_date}
                  addToFavoritesAndUpdateList={addToFavoritesAndUpdateList}
                  addToWatchList={addToWatchList}
                />
              </li>
            ))}
            <div className="moreButton">
              <button className='loadMoreButton' onClick={loadMoreMovies}>
                Показать еще
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MovieList;