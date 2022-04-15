const { Pool, Client } = require('pg')
config = require('dotenv').config()

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

exports.dbGetSchedule = async (school) => {

    let scheduleObj = {}
    let rows = {}
    let tmpStr = "";
    let tmpCnt = 1;

    let seasonDates = '{"2021-08-01", "2022-07-01"}'
    const text = 'SELECT events.* FROM events JOIN seasons ON (events.season_id = seasons.season_id) JOIN schools ON (events.school_id = schools.school_id) WHERE seasons.season_dates = ($1) AND schools.short_name ILIKE ($2) ORDER BY event_dates[1] ASC'
    let values = [seasonDates, school];
    const res = await client.query(text, values);

    // Clean up data from db call to make it easier to display on DOM
    res.rows.forEach((row) => {

        scheduleObj = {
            dates: '',
            type: '',
            name: '',
            opponent: '',
            win: '',
            points: '',
        };

        // dates
        scheduleObj.dates = row.event_dates[0].toISOString().slice(5, 10);

        // event type
        scheduleObj.type = row.event_type;

        // event name
        if(!row.event_name) {
            scheduleObj.name = '-';
        }
        else {
            scheduleObj.name = row.event_name;
        };

        // opponent
        if(!row.opponent_school_short_name) {
            scheduleObj.opponent = '-';
        }
        else {
            scheduleObj.opponent = row.opponent_school_short_name;
        };

        // win / lose & points
        tmpStr = '';
        if(!row.points) {
            scheduleObj.win = '-';
            scheduleObj.points = '-';
        }
        else {
            if(row.points > row.opponent_points) {
                scheduleObj.win = 'W';
            }
            else {
                scheduleObj.win = 'L';
            };
            tmpStr += row.points.toString() + '-' + row.opponent_points.toString();
            scheduleObj.points = tmpStr;
        };

        rows[tmpCnt] = scheduleObj;
        tmpCnt++;
    });
    console.log(rows)
    // //await client.end();
    return rows;
};