import React,{useState, useEffect} from 'react'
import MovieCard from '../movieCard/MovieCard';
import { addToFavorites, removeFromWatchList } from '../services/MovieService';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTdhMmMyOTBmZDk0Njg4OTdlOTVkZTYzOGRmNWJiOSIsInN1YiI6IjY1MDAwYTNhZDdkY2QyMDBhY2IwMjAzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ungifeWLj9mMk0oV0WbLX6UW7R8frGLgQ9M--UQM1e0'; 

const WantToSee = (props) => {
  const {watchListMovies, updateWatchListMovies, setPageTitle} = props;

  const [currentPage, setCurrentPage] = useState(0); 
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setPageTitle("Хочу посмотреть")
  }, [setPageTitle])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    };

    if (currentPage === 0) { // 
      fetch(`https://api.themoviedb.org/3/account/20427866/watchlist/movies?language=ru-RU&page=1`, options)
        .then((res) => res.json())
        .then((data) => {
          updateWatchListMovies(data.results);
          setCurrentPage(1); // Обновление страницы на 1 после успешной загрузки первой страницы
        })
        .catch((error) => {
          console.error("Error loading data:", error);
        });
    }
  }, [currentPage, updateWatchListMovies]);


  function loadMoreWatchListMovies() {
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

    fetch(`https://api.themoviedb.org/3/account/20427866/watchlist/movies?language=ru-RU&page=${nextPage}`, options)
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingMore(false);
        setCurrentPage(nextPage);
        updateWatchListMovies((prevFavoriteMovies) => [...prevFavoriteMovies, ...data.results]);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setIsLoadingMore(false);
      });
  }
    
  const addToFavoritesAndUpdateList = async (movieId) => {
    try {
      await addToFavorites(movieId);
    } catch (error) {
      console.error("Ошибка при добавлении фильма в избранное")
    }
  }

  const removeFromWatchListAndUpdateList = async (movieId) => {
    try {
      const response = await removeFromWatchList(movieId);
      if (response.success) {
        const updatedWatchListMovies = watchListMovies.filter((movie) => movie.id !== movieId);
        updateWatchListMovies(updatedWatchListMovies);
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
          {watchListMovies.map((movie) => (
              <li key={movie.id} className="gallery__item">
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  poster_path={movie.poster_path}
                  genre_ids={movie.genre_ids}
                  release_date={movie.release_date}
                  addToFavoritesAndUpdateList={addToFavoritesAndUpdateList}
                  isWantToSee={true}
                  removeFromWatchListAndUpdateList={removeFromWatchListAndUpdateList}
                />
              </li>
            ))}
            <div className="moreButton">
              <button className='loadMoreButton' onClick={loadMoreWatchListMovies}>
                Показать еще
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};



export default WantToSee;