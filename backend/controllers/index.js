const dbManager = require('../public/javascripts/dbmanager');

exports.getSchedule = async (req, res, next) => {

    let tmp = req.body;
    console.log(tmp, 'working');
    dbManager.dbGetSchedule();


};