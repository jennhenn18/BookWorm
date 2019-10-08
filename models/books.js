// create a table for current book
module.exports = function(sequelize, DataTypes) {
    var Bcurrent = sequelize.define('Bcurrent', {
        // book id
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // book name
        name: {
            type: DataTypes.STRING
        },
        // book author
        author: {
            type: DataTypes.STRING
        },
        // book bio
        bio: {
            type: DataTypes.STRING
        }
    });

    console.table(Bcurrent);
    return Bcurrent
}


