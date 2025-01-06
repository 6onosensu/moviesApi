module.exports = (sequelize, DataTypes) => {
    const Director = sequelize.define( 'Director', {
        directorID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    Director.associate = (models) => {
        Director.belongsToMany(models.Movie, { through: 'MovieDirectors' });
    };
    
    return Director;
};