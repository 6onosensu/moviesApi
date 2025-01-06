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
                allowNull: false
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
                allowNull: false
            },
            actors: {
                type: DataTypes.JSON,
                allowNull: false
            },
            directors: {
                type: DataTypes.JSON,
                allowNull: false
            },
        }
    );
    return Movie;
};