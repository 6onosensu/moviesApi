const {Sequelize, DataTypes} = require(`sequelize`);

const sequelize = new Sequelize(
    process.env.DB_DATANAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOSTNAME,
        dialect: 'mariadb',
        logging: console.log,
        dialectOptions: {
            ssl: false, 
            connectTimeout: 30000,
          },
          pool: {
            max: 5,
            min: 0,
            idle: 10000,
            acquire: 30000,
          },
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

db.Movie = require("./models/Movie")(sequelize, DataTypes);
db.Genre = require("./models/Genre")(sequelize, DataTypes);
db.Actor = require("./models/Actor")(sequelize, DataTypes);
db.Director = require("./models/Director")(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

const sync = async () => {
    try {
        await sequelize.sync();
        //await sequelize.sync({ alter: true });
        console.log('Database is now synchronized');
    } catch (error) {
        console.error('Error synchronizing the database: ' + error);
    }
};

module.exports = { db, sync };