const actorController = require("../controllers/ActorsController.js");

module.exports = (app) => {
    app.route('/actors')
        .get(actorController.getAll)
        .post(actorController.create);;

    app.route('/actors/:actorID')
        .get(actorController.getById)
        .put(actorController.editById)
        .delete(actorController.deleteById);
};
