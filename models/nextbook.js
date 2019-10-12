// create a table for Next books
module.exports = function(sequelize, DataTypes) {
    var NextBooks = sequelize.define('NextBook', {
        // event ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // next book
        NextBookID: {
            type: DataTypes.INTEGER
        }
    });

    console.table(NextBooks);
    return NextBooks
}


