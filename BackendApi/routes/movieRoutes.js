const MoviesController = require("../controllers/MoviesController.js");

module.exports = (app) => {
    app.route("/movies")
        .get(MoviesController.getAll)
        .post(MoviesController.create);

    app.route("/movies/:movieID")
        .get(MoviesController.getById)
        .put(MoviesController.editById)
        .delete(MoviesController.deleteById);
};