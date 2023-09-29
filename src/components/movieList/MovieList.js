import React, { useEffect, useState } from 'react';
import MovieCard from '../movieCard/MovieCard';
import { addToFavorites, addToWatchList } from '../services/MovieService';
import genresData from '../movieCard/genresData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl, faAngleDown, faX} from '@fortawesome/free-solid-svg-icons'

import "./movieList.scss"

const API_URL = "https://api.themoviedb.org/3/movie/popular?language=ru-RU&api_key=c57a2c290fd9468897e95de638df5bb9&";

function MovieList(props) {
  const { movies, updateMovieList, setPageTitle } = props;

  const [yearRange, setYearRange] = useState(null);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [moviesToLoad, setMoviesToLoad] = useState(20);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isGenresOpen, setIsGenresOpen] = useState(false);

  const [isYearsOpen, setIsYearsOpen] = useState(false);
  const [loadedMoviesCount, setLoadedMoviesCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const list = <FontAwesomeIcon icon={faListUl} />
  const angle_down = <FontAwesomeIcon icon={faAngleDown} />
  const xmark = <FontAwesomeIcon icon={faX}/>

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

  const toggleGenreList = () => {
    setIsGenresOpen(!isGenresOpen);
  }

  const toggleYearList = () => {
    setIsYearsOpen(!isYearsOpen);
  }

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  }

  async function loadMoreMovies() {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    const nextPage = Math.ceil((movies.length + 1) / 20);

    try {
      const filteredMovies = await loadMoviesWithFilters(
        nextPage,
        selectedGenre,
        selectedYear,
        yearRange ? yearRange.startYear : null,
        yearRange ? yearRange.endYear : null
      );

      setIsLoadingMore(false);
      setMoviesToLoad(20);
      updateMovieList((prevMovies) => [...prevMovies, ...filteredMovies]);
    } catch (error) {
      setIsLoadingMore(false);
      console.error('Ошибка при загрузке фильмов', error);
    }
  }

  async function loadMoviesWithFilters(page, genreId, year, startYear, endYear) {
    const genreQuery = genreId ? `&with_genres=${genreId}` : '';
    let yearQuery = '';

    if (year) {
      yearQuery = `&primary_release_year=${year}`;
    }

    if (startYear && endYear) {
      yearQuery = `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
    } else if (startYear) {
      yearQuery = `&primary_release_date.gte=${startYear}-01-01`;
    } else if (endYear) {
      yearQuery = `&primary_release_date.lte=${endYear}-12-31`;
    }

    const urlWithPage = `${API_URL}&page=${page}${genreQuery}${yearQuery}`;

    try {
      const response = await fetch(urlWithPage);
      const data = await response.json();

      let filteredMovies = data.results;

      if (genreId) {
        filteredMovies = filteredMovies.filter((movie) => {
          return movie.genre_ids.includes(genreId);
        });
      }

      return filteredMovies.slice(0, moviesToLoad);
    } catch (error) {
      console.error('Ошибка при загрузке фильмов', error);
      throw error;
    }
  }

  console.log(movies);

  function handleGenreClick(genreId) {
    setSelectedGenre(genreId);
    setSelectedYear(null);
    setMoviesToLoad(20);
    const genreName = genresData.getGenreNameById(genreId);
    setPageTitle(`Фильмы в жанре  '${genreName}'`);

    loadMoviesWithFilters(1, genreId, selectedYear)
      .then((filteredMovies) => {
        setLoadedMoviesCount(20);
        updateMovieList(filteredMovies);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке фильмов', error);
      });
  }

  async function handleYearClick(year) {
    setSelectedYear(year);
    setMoviesToLoad(20);
    setPageTitle(`Фильмы за ${year} год `);

    loadMoviesWithFilters(1, selectedGenre, year)
      .then((filteredMovies) => {
        setLoadedMoviesCount(20);
        updateMovieList(filteredMovies);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке фильмов', error);
      });
  }

  function handleYearRangeClick(startYear, endYear) {
    setYearRange({ startYear, endYear });
    setSelectedYear(null);
    setMoviesToLoad(20);
    setPageTitle(`Фильмы с ${startYear} по ${endYear} год`);

    loadMoviesWithFilters(1, selectedGenre, null, startYear, endYear)
      .then((filteredMovies) => {
        setLoadedMoviesCount(20);
        updateMovieList(filteredMovies);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке фильмов', error);
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
                    <li onClick={() => handleGenreClick(28)} className="filterDropdown-item">Боевик</li>
                    <li onClick={() => handleGenreClick(53)} className="filterDropdown-item">Триллер</li>
                    <li onClick={() => handleGenreClick(35)} className="filterDropdown-item">Комедия</li>
                    <li onClick={() => handleGenreClick(27)} className="filterDropdown-item">Ужасы</li>
                    <li onClick={() => handleGenreClick(12)} className="filterDropdown-item">Приключения</li>
                    <li onClick={() => handleGenreClick(18)} className="filterDropdown-item">Драма</li>
                    <li onClick={() => handleGenreClick(10749)} className="filterDropdown-item">Мелодрама</li>
                    <li onClick={() => handleGenreClick(878)} className="filterDropdown-item">Фантастика</li>
                    <li onClick={() => handleGenreClick(10751)} className="filterDropdown-item">Семейный</li>
                    <li onClick={() => handleGenreClick(14)} className="filterDropdown-item">Фэнтези</li>
                    <li onClick={() => handleGenreClick(80)} className="filterDropdown-item">Криминал</li>
                    <li onClick={() => handleGenreClick(9648)} className="filterDropdown-item">Детектив</li>
                    <li onClick={() => handleGenreClick(10752)} className="filterDropdown-item">Военный</li>
                    <li onClick={() => handleGenreClick(99)} className="filterDropdown-item">Документальный</li>
                    <li onClick={() => handleGenreClick(37)} className="filterDropdown-item">Вестерн</li>
                    <li onClick={() => handleGenreClick(16)} className="filterDropdown-item">Мультфильм</li>
                    <li onClick={() => handleGenreClick(36)} className="filterDropdown-item">История</li>
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
                    <li onClick={() => handleYearClick(2023)} className="filterDropdown-item">2023 год</li>
                    <li onClick={() => handleYearClick(2022)} className="filterDropdown-item">2022 год</li>
                    <li onClick={() => handleYearClick(2021)} className="filterDropdown-item">2021 год</li>
                    <li onClick={() => handleYearClick(2020)} className="filterDropdown-item">2020 год</li>
                    <li onClick={() => handleYearRangeClick(2015, 2020)} className="filterDropdown-item">2015-2020</li>
                    <li onClick={() => handleYearRangeClick(2010, 2015)} className="filterDropdown-item">2010-2015</li>
                    <li onClick={() => handleYearRangeClick(2000, 2010)} className="filterDropdown-item">2000-2010</li>
                    <li onClick={() => handleYearRangeClick(1950, 1999)} className="filterDropdown-item">1950-1999</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-button" onClick={() => window.location.reload()}>
              {xmark}
              Сбрость фильтры
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
