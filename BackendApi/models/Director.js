module.exports = (sequelize, DataTypes) => {
    const Director = sequelize.define(
        'Director',
        {
            directorID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }
    );
    return Director;
};