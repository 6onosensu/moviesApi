const genresController = require("../controllers/GenresController.js");

module.exports = (app) => {
    app.route("/genres")
        .get(genresController.getAllGenres)
        .post(genresController.createGenre);

    app.route("/genres/:genreID")
        .get(genresController.getGenreById)
        .put(genresController.updateGenre)
        .delete(genresController.deleteGenre);
};
