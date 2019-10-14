// create a table for Next books
module.exports = function(sequelize, DataTypes) {
    var NextBook = sequelize.define('NextBook', {
        // event ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // next book
        nextbookid: {
            type: DataTypes.INTEGER
        }
    });

    console.table(NextBook);
    return NextBook
}


