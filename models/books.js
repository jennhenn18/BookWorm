// create a table for the books
module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define('Book', {
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

    console.table(Book);
    return Book
}