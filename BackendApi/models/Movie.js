module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
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
        }
        
    });
    Movie.associate = (models) => {
        Movie.belongsToMany(models.Genre, { through: 'MovieGenres' });
        Movie.belongsToMany(models.Actor, { through: 'MovieActors' });
        Movie.belongsToMany(models.Director, { through: 'MovieDirectors' });
    };
    return Movie;
};