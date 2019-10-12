// create a table for Current book
module.exports = function(sequelize, DataTypes) {
    var CurrentBook = sequelize.define('CurrentBook', {
        // event ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // next book
        currentbookid: {
            type: DataTypes.STRING
        }
    });

    console.table(CurrentBook);
    return CurrentBook
}