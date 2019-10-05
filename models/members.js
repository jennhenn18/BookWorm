// create a member table
module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define('Member', {
        // member id
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // member name column
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // member email column
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    console.table(Member);
    return Member
};