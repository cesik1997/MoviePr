import React, {useState} from "react";
import genresData from "./genresData";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEye, faTrash, faEyeSlash, faListUl} from '@fortawesome/free-solid-svg-icons'

import "./movieCard.scss";


const MovieCard = (props) => {
    const { genre_ids, release_date, isFavorite, removeFromFavoritesAndUpdateList, addToFavoritesAndUpdateList, addToWatchList, isWantToSee, removeFromWatchListAndUpdateList } = props;

    const [isRemovedMessageVisible, setIsRemovedMessageVisible] = useState(false);
    const [isAddedMessageVisible, setIsAddedMessageVisible] = useState(false);

    const star = <FontAwesomeIcon icon={faHeart} />
    const eye = <FontAwesomeIcon icon={faEye} />
    const trash = <FontAwesomeIcon icon={faTrash}/>
    const eye_slash = <FontAwesomeIcon icon={faEyeSlash}/>
    const list = <FontAwesomeIcon icon={faListUl}/>
    
    const API_IMG = "https://image.tmdb.org/t/p/w500/"

    const roundedVoteAverage = parseFloat(props.vote_average).toFixed(1);  // округлил оценку до 2 символов типа 7.2
    const firstGenreName = genre_ids && genre_ids.length > 0 ? genresData.getGenreNameById(genre_ids[0]) : "";  // через пропсы достал массив с жанрами(genre_ids) и получил только первый жанр по ID (там приходит 3 айди, а мне нужен 1)
    const year = props.release_date ? props.release_date.split("-")[0] : "";  // что бы год отображался только типо 2024, а не 2023-11-24


    function generateMovieLink(id) {
        return `https://www.themoviedb.org/movie/${id}`;
    }
    function handleImageClick() {
        const movieLink = generateMovieLink(props.id);
        window.open(movieLink, "_blank");
    }


      function handleAddToFavoritesClick() {
        setIsAddedMessageVisible(true);

        setTimeout(() => {
          setIsAddedMessageVisible(false);
        }, 3000);

        addToFavoritesAndUpdateList(props.id);
      }

    return (
        
        <div className="card">
            <div className="poster">
                <img onClick={handleImageClick}  src={props.poster_path ? API_IMG + props.poster_path : "https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80"} alt="" />
            </div>
            <div className="info">
                <p className="title">{props.title}</p>
                <p className="vote">{roundedVoteAverage}</p>
            </div>
            
            <div className="overview">
                <p className="overview-text">{firstGenreName} {year}</p>
            </div>
            <div className="favorite-button">
        {isFavorite ? (
                <div className="trashBtn" title={isRemovedMessageVisible ? "Фильм удален" : "Удалить из избранного"} onClick={() => removeFromFavoritesAndUpdateList(props.id)}>{trash}</div>
                ) : (
                <div className="starBtn" title={isAddedMessageVisible ? "Фильм добавлен" : "Добавить в избранное"} onClick={() => handleAddToFavoritesClick(props.id)}>{star}</div>
                )}
        {isWantToSee ? (
                <div className="eyeBtn" title="Не хочу смотреть" onClick={() => removeFromWatchListAndUpdateList(props.id)}>{eye_slash}</div>
                ) : (
                <div className="eyeBtn" title="Хочу посмотреть" onClick={() => addToWatchList(props.id)}>{eye}</div>   
                )}
            </div>           
        </div>
        
    )
}
export default MovieCard;
