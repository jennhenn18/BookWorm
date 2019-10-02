// create a member table
module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define('Member', {
        // member id
        id: {
            type: DataTypes.INT,
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


    // create association with club 
    // a member can only have one club so this relationship with be a one to many.
    Member.associate = function(models) {
        Member.belongsTo(models.Club, {
            foreignKey: {
                allowNull: false
            }
        });
    };


    console.table(Member);
};