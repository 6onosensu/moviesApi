const directorController = require("../controllers/DirectorController.js");

module.exports = (app) => {
    app.route('/directors')
        .get(directorController.getAll)
        .post(directorController.create);;

    app.route('/directors/:directorID')
        .get(directorController.getById)
        .put(directorController.editById)
        .delete(directorController.deleteById);
};