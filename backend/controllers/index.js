const dbManager = require('../public/javascripts/dbmanager');

exports.getSchedule = async (req, res, next) => {

    let school = req.query.school;
    dbManager.dbGetSchedule(school);

};