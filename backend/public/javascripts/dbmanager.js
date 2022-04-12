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
    
    let scheduleObj = {
        dates: {},
        times: {},
        type: {},
        name: {},
        opponent: {},
        win: {},
        points: {},
        oppPoints: {},
        placement: {},
        placementOutOf: {}
    };
    let tmpCnt = 1;

    let seasonDates = '{"2021-08-01", "2022-07-01"}'
    const text = 'SELECT * FROM events JOIN seasons ON (events.season_id = seasons.season_id) JOIN schools ON (events.school_id = schools.school_id) WHERE seasons.season_dates = ($1) AND schools.short_name ILIKE ($2) ORDER BY event_dates[1] ASC'
    let values = [seasonDates, school];
    const res = await client.query(text, values);

    // parse data from db call to object, to make it easier to display on dom
    res.rows.forEach((row) => {

        scheduleObj.dates[tmpCnt] = [];
        scheduleObj.times[tmpCnt] = [];
        scheduleObj.type[tmpCnt] = [];
        scheduleObj.name[tmpCnt] = [];
        scheduleObj.opponent[tmpCnt] = [];
        scheduleObj.win[tmpCnt] = [];
        scheduleObj.points[tmpCnt] = [];
        scheduleObj.oppPoints[tmpCnt] = [];
        scheduleObj.placement[tmpCnt] = [];
        scheduleObj.placementOutOf[tmpCnt] = [];

        // dates
        row.event_dates.forEach((date) => {
            scheduleObj.dates[tmpCnt].push(date.toISOString().slice(5, 10))
        });
        
        // times
        row.event_times.forEach((time) => {
            if(typeof(time) === 'object') {
                time.forEach((t) => {
                    scheduleObj.times[tmpCnt].push(t.slice(0, 5));
                });
            }
            else {
                scheduleObj.times[tmpCnt].push(time.slice(0, 5));
            };
        });

        // event type
        scheduleObj.type[tmpCnt].push(row.event_type);

        // event name
        if(!row.event_name) {
            scheduleObj.name[tmpCnt].push('');
        }
        else {
            scheduleObj.name[tmpCnt].push(row.event_name);
        };

        // opponent
        if(!row.opponent_school_short_name) {
            scheduleObj.opponent[tmpCnt].push('');
        }
        else {
            scheduleObj.opponent[tmpCnt].push(row.opponent_school_short_name);
        };

        // win / lose & points
        if(!row.points) {
            scheduleObj.win[tmpCnt].push('');
            scheduleObj.points[tmpCnt].push('');
            scheduleObj.oppPoints[tmpCnt].push('');
        }
        else {
            if(row.points > row.opponent_points) {
                scheduleObj.win[tmpCnt].push('W');
            }
            else {
                scheduleObj.win[tmpCnt].push('L');
            };
            scheduleObj.points[tmpCnt].push(row.points);
            scheduleObj.oppPoints[tmpCnt].push(row.opponent_points);
        };

        // tournament placement
        if(!row.placement) {
            scheduleObj.placement[tmpCnt].push('');
            scheduleObj.placementOutOf[tmpCnt].push('');
        }
        else {
            scheduleObj.placement[tmpCnt].push(row.placement[0]);
            scheduleObj.placementOutOf[tmpCnt].push(row.placement[1]);
        };
        
        tmpCnt++;
    });

    // console.log(scheduleObj)
    // //await client.end();
    return scheduleObj; 
};