const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define(
        'Movie',
        {
            movieID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                alloewNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            year: {
                type: DataTypes.INTEGER,
            },
            genres: {
                type: DataTypes.JSON,
                alloeNull: false
            },
            actors: {
                type: DataTypes.JSON,
                alloeNull: false
            },
            directors: {
                type: DataTypes.JSON,
                alloeNull: false
            },
        }
    ) 
}