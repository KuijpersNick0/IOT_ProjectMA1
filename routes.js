let express = require('express');
let router = express.Router();
let chartController = require('./controllers/chartController');

router.get('/', function(req, res) {  
    res.render('../Views/homepage.ejs');
});

router.get('/db.js', chartController.chart);

module.exports = router;