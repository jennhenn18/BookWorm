// create the bookclub table
module.exports = function(sequelize, DataTypes) {
    var Club = sequelize.define('Club', {
        // assign Club ID
        id: {
            type: DataTypes.INT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        // name column
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [20]
        }, 
        // current book id column
        currentbook: {
            type: DataTypes.INT,
        },
        // next book id column
        nextbook: {
            type: DataTypes.INT,
        },
        // next event location column
        eventlocation: {
            type: DataTypes.STRING,
            len: [30]
        },
        // next event time column
        eventtime: {
            type: DataTypes.STRING,
            len: [6],
        }
    });



    // create an association - one to many.
    // there can be multiple members to a book club

    Club.associate = function(models) {
        Club.hasMany(models.Member, {
            onDelete: 'cascade'
        });
    };

    // create an association between the books table - many to many. Create a through table association
    Club.associate = function(models) {
        Club.belongsToMany(models.Book, {
            through: 'BookClub',
            as: 'book',
            foreignKey: 'clubId',
            otherKey: 'bookId'
        });
    };

    console.table(Club);
};
