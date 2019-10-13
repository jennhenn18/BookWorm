var db = require('../models');

module.exports = function(app) {

// get events from table
app.get('/api/events', function(req, res){
    db.Events.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    }).then(function(dbEvents){
        res.json(dbEvents);
    })
})


// update location and time in events table
app.post('/api/events/', function(req, res) {

    db.Events.create({
        location: req.body.location,
        time: req.body.time
    }).then(function(dbEvents){
        res.json(dbEvents)
    })

})




}