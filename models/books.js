// create a table for the books
module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define('book', {
        // book id
        id: {
            type: DataTypes.INT
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

    // create an association with the club table. 
    // a club can have many books and a book can have many clubs so this relation is many to many. Create a through table association.

    Book.associate = function(models) {
        Book.belongstoMany(models.Club, {
            through: 'BookClub',
            as: 'club',
            foreignKey: 'bookId',
            otherKey: 'clubId'
        });
    };

    console.table(Book);
    
}