// create a table for events
module.exports = function(sequelize, DataTypes) {
    var Events = sequelize.define('Events', {
        // event ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // location
        location: {
            type: DataTypes.STRING
        },
        // time
        time: {
            type: DataTypes.STRING
        }
    });

    console.table(Events);
    return Events
}