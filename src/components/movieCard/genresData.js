const genresData = {
    "genres": [
        {
          "id": 28,
          "name": "Боевик"
        },
        {
          "id": 12,
          "name": "Приключения"
        },
        {
          "id": 16,
          "name": "Мультфильм"
        },
        {
          "id": 35,
          "name": "Комедия"
        },
        {
          "id": 80,
          "name": "Криминал"
        },
        {
          "id": 99,
          "name": "Документальный"
        },
        {
          "id": 18,
          "name": "Драма"
        },
        {
          "id": 10751,
          "name": "Семейный"
        },
        {
          "id": 14,
          "name": "Фэнтези"
        },
        {
          "id": 36,
          "name": "История"
        },
        {
          "id": 27,
          "name": "Ужасы"
        },
        {
          "id": 10402,
          "name": "Музыка"
        },
        {
          "id": 9648,
          "name": "Детектив"
        },
        {
          "id": 10749,
          "name": "Мелодрама"
        },
        {
          "id": 878,
          "name": "Фантастика"
        },
        {
          "id": 10770,
          "name": "Телевизионный фильм"
        },
        {
          "id": 53,
          "name": "Триллер"
        },
        {
          "id": 10752,
          "name": "Военный"
        },
        {
          "id": 37,
          "name": "Вестерн"
        }
      ],

      getGenreNameById: function (genreId) {
        const genre = this.genres.find(g => g.id === genreId)
        return genre ? genre.name : "Неизвестный жанр"
      }
 };



export default genresData;