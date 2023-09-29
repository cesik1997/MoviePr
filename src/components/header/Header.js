import React, {useState} from "react";
import { Link } from "react-router-dom";

import SearchPanel from "../searchPanel/SearchPanel";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./header.scss";

const element = <FontAwesomeIcon icon={faMagnifyingGlass} />

const Header = ({updateMovieList, updateWatchListMovies, updateFavoriteMovieList, pageTitle}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleUpdateMovieList = (newMovies) => {
        updateMovieList(newMovies);
        updateFavoriteMovieList(newMovies);
        updateWatchListMovies(newMovies);
      };

    return (
        <div className="header__container">
            <div className="header__containerBar">
                <div className="header__Nav">
                    <ul className="header__NavBar">
                        <li className="miniItem"><Link to="/popular">Главная</Link></li>
                        <li className="miniItem"><Link to="/want-to-see">Хочу посмотреть</Link></li>
                        <li className="miniItem"><Link to="/favorite-movies">Избранное</Link></li>
                        <li onClick={openModal} className="miniItem miniItem-search">{element}Поиск фильмов</li>
                    </ul>
                    <SearchPanel isOpen={isModalOpen} updateMovieList={handleUpdateMovieList} updateWatchListMovies={updateWatchListMovies} updatedFavoriteMovies={updateFavoriteMovieList} />
                </div>
                <div className="header__containerTitle">
                     <h1 className="header__title">{pageTitle}</h1>
                </div> 
            </div>
        </div>

    )
}

export default Header;