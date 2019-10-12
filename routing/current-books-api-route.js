var db = require('../models');

module.exports = function(app) {

// get books ID from the current book table
app.get('/api/currentbooks/', function(req, res){
    db.CurrentBook.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    }).then(function(dbCurrentBook){
        console.log(dbCurrentBook[0].currentbookid)
        res.json(dbCurrentBook[0].currentbookid);
    });
});


// add book to the current book table
app.post('/api/currentbooks/', function(req, res) {
    db.CurrentBook.create({
        currentbookid: req.body.id
    }).then(function(dbCurrentBook){
        res.json(dbCurrentBook)
     });
});

}