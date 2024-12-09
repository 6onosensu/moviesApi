db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.movie = require("./models.movie")(sequelize, DataTypes);
db.users = require("./models.genre")(sequelize, DataTypes);

const sync = (async () => {
    await sequelize.sync({alter: true});
})