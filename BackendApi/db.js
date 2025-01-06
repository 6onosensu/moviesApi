const {Sequelize, DataTypes} = require(`sequelize`);

const sequelize = new Sequelize(
    process.env.DB_DATANAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOSTNAME,
        dialect: 'mariadb',
        logging: console.log,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movie = require("./models/Movie")(sequelize, DataTypes);
db.users = require("./models/Genre")(sequelize, DataTypes);
db.movie = require("./models/Actor")(sequelize, DataTypes);
db.users = require("./models/Director")(sequelize, DataTypes);

const sync = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database is now synchronized');
    } catch (error) {
        console.error('Error synchronizing the database: ' + error);
    }
};

module.exports = { db, sync };