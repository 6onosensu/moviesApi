module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        genreID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    Genre.associate = (models) => {
        Genre.belongsToMany(models.Movie, { through: 'MovieGenres' });
    };
    return Genre;
};