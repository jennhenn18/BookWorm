// create a table for current book
module.exports = function(sequelize, DataTypes) {
    var BookClub = sequelize.define('BookClub', {
        // book id
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // book name
        CurrentBookID: {
            type: DataTypes.INTEGER
        },
        // book author
        NextBookID: {
            type: DataTypes.INTEER
        }
    });

    console.table(BookClub);
    return BookClub
}


