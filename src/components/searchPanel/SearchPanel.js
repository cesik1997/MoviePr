import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import "./searchPanel.scss"

const element = <FontAwesomeIcon icon={faXmark} />
const API_SEARCH = 'https://api.themoviedb.org/3/search/movie?language=ru-RU&api_key=c57a2c290fd9468897e95de638df5bb9&query='

const SearchPanel = ({isOpen, closeModal, updateMovieList, updateFavoriteMoviesList, updateWatchListMovies}) => {


    const [moviesList, setMoviesList] = useState([]);
    const [term, setTerm] = useState("")

    if (!isOpen) return null;
    

    const handleSearch = (e) => {
        const searchTerm = e.target.value; // Получаем текущее значение поля ввода
        setTerm(searchTerm); // Обновляем состояние term


        fetch(API_SEARCH + searchTerm)
        .then(res => res.json())
        .then(data => {
            setMoviesList(data.results);
            updateMovieList(data.results);
        });
        
    }
    const handleGoBack = () => {
        window.location.reload(); // Вернуться на предыдущую страницу
    }

    if (!isOpen) return null;

    return (
       <div className="fullscreen-popup">
       
            <div className="searchInputContainer">
                <h1 className="searchInput__title">Поиск</h1>

                <form  autoComplete="off" className="searchInput__form">
                    <input onChange={handleSearch} placeholder=" Введите фильм..." tabIndex="1" type="text" className="searchInput__box" value={term} />
                </form>
            </div>
                <div onClick={handleGoBack} className="fullscreen-popup__close" title="Нажмите, чтобы закрыть форму">
                    <div className="icon_close">
                        {element}
                    </div>
                </div>
            </div> 
    )
}


export default SearchPanel;