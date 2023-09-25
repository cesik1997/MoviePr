import axios from "axios";

 export async function addToFavorites(movieId) {

    const API_KEY = 'c57a2c290fd9468897e95de638df5bb9'; 
    const ADD_TO_FAVORITES_URL = `https://api.themoviedb.org/3/account/20427866/favorite?api_key=${API_KEY}&session_id=d523620f00c367ccb3c58285a09a79c375062b44`;
  
    const requestData = {
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    };
  
    try {
      const response = await axios.post(ADD_TO_FAVORITES_URL, requestData);
      console.log('Фильм добавлен в избранное:', response.data);
      return response.data; // Возвращаем данные из ответа
      
    } catch (error) {
      console.error('Ошибка при добавлении фильма в избранное:', error);
      throw error; // Бросаем ошибку для обработки в компоненте
    }
  }

  export async function removeFromFavorites(movieId) {
    const API_KEY = 'c57a2c290fd9468897e95de638df5bb9'; 
    const REMOVE_FROM_FAVORITES_URL = `https://api.themoviedb.org/3/account/20427866/favorite?api_key=${API_KEY}&session_id=d523620f00c367ccb3c58285a09a79c375062b44`;

  const requestData = {
    media_type: 'movie',
    media_id: movieId,
    favorite: false, 
  };

  try {
    const response = await axios.post(REMOVE_FROM_FAVORITES_URL, requestData);
    console.log('Фильм удален из избранного:', response.data);
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    console.error('Ошибка при удалении фильма из избранного:', error);
    throw error; // Бросаем ошибку для обработки в компоненте
  }
}

export async function addToWatchList(movieId) {
  const API_KEY = 'c57a2c290fd9468897e95de638df5bb9'; 
  const ADD_TO_WATCH_LIST = `https://api.themoviedb.org/3/account/20427866/watchlist?api_key=${API_KEY}&session_id=d523620f00c367ccb3c58285a09a79c375062b44`;

  const requestData = {
    media_type: 'movie',
    media_id: movieId,
    watchlist: true,
  };

  try {
    const response = await axios.post(ADD_TO_WATCH_LIST, requestData);
    console.log('Фильм был добавлен в "Хочу посмотреть"', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении фильма в "Хочу посмотреть"', error);
    throw error;
  }
}

export async function removeFromWatchList(movieId) {
  const API_KEY = 'c57a2c290fd9468897e95de638df5bb9'; 
  const REMOVE_FROM_WATCH_LIST = `https://api.themoviedb.org/3/account/20427866/watchlist?api_key=${API_KEY}&session_id=d523620f00c367ccb3c58285a09a79c375062b44`;

  const requestData = {
    media_type: 'movie',
    media_id: movieId,
    watchlist: false,
  };

  try {
    const response = await axios.post(REMOVE_FROM_WATCH_LIST, requestData);
    console.log('Фильм был удалён из "Хочу посмотреть"', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении фильма из "Хочу посмотреть"', error);
    throw error;
  }
}