var express = require('express');
var app = express();
var router = express.Router();

const getSchedule = require('../controllers/index')
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// allow requests from vue front end (development only)
const allowRequest = app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/schedule', allowRequest, getSchedule.getSchedule);

module.exports = router;
