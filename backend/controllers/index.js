const dbManager = require('../public/javascripts/dbmanager');

exports.getSchedule = async (req, res, next) => {

    let school = req.query.school;
    let schedule = await dbManager.dbGetSchedule(school)
    res.status(200).json(schedule);

};