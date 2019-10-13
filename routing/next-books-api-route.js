var db = require('../models');

module.exports = function(app) {

// get books ID from the next book table
app.get('/api/nextbooks', function(req, res){
    db.NextBooks.findAll({}).then(function(dbNextBooks){
    console.log(dbNextBooks)
    res.json(dbBookClub);
    })
})


// add book to the nextbook table
app.put('/api/nextbooks', function(req, res){
    db.NextBooks.create({
        nextbookid: req.body.id
    }).then(function(dbNextBook){
        res.json(dbNextBook);
    });
});


}

