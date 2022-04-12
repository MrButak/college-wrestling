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

    // parse data from db call to object, to make it easier to display on dom
    res.rows.forEach((row) => {
        console.log(row)
        scheduleObj = {
            dates: {},
            times: {},
            type: {},
            name: {},
            opponent: {},
            win: {},
            points: {},
            placement: {},
            eventLocation: {},
            locationStatus: {},
            wasCanceled: {}
        };
        scheduleObj.dates = [];
        scheduleObj.times = [];
        scheduleObj.type = [];
        scheduleObj.name = [];
        scheduleObj.opponent = [];
        scheduleObj.win = [];
        scheduleObj.points = [];
        scheduleObj.placement = [];
        scheduleObj.eventLocation = [];
        scheduleObj.locationStatus = [];
        scheduleObj.wasCanceled = [];

        // was canceled?
        if(row.was_canceled) {
            scheduleObj.wasCanceled.push(true);
        }

        // dates
        tmpStr = '';
        if(row.event_dates.length > 1) {
            
            row.event_dates.forEach((date) => {
                tmpStr = '';
                tmpStr += date.toISOString().slice(5, 10);
                scheduleObj.dates.push(tmpStr);
            });
        }
        else {

            scheduleObj.dates.push(row.event_dates[0].toISOString().slice(5, 10));
        };
        
        // times
        row.event_times.forEach((time) => {
            tmpStr = '';
            if(typeof(time) === 'object') {
                time.forEach((t) => {
                    tmpStr += t.slice(0, 5) + '/';
                });
                tmpStr = tmpStr.slice(0, -1);
                scheduleObj.times.push(tmpStr);
            }
            else {
                scheduleObj.times.push(time.slice(0, 5));
            };
        });

        // event type
        scheduleObj.type.push(row.event_type);

        // event name
        if(!row.event_name) {
            scheduleObj.name.push('-');
        }
        else {
            scheduleObj.name.push(row.event_name);
        };

        // opponent
        if(!row.opponent_school_short_name) {
            scheduleObj.opponent.push('-');
        }
        else {
            scheduleObj.opponent.push(row.opponent_school_short_name);
        };

        // win / lose & points
        tmpStr = '';
        if(!row.points) {
            scheduleObj.win.push('-');
            scheduleObj.points.push('-');
        }
        else {
            if(row.points > row.opponent_points) {
                scheduleObj.win.push('W');
            }
            else {
                scheduleObj.win.push('L');
            };
            tmpStr += row.points.toString() + '-' + row.opponent_points.toString()
            scheduleObj.points.push(tmpStr);
        };

        // tournament placement
        tmpStr = '';
        if(!row.placement) {
            scheduleObj.placement.push('-');
        }
        else {
            tmpStr += row.placement[0] + 'th/' + row.placement[1];
            scheduleObj.placement.push(tmpStr);  
        };

        // city and state
        tmpStr = '';
        tmpStr += row.city + ', ' + row.state;
        scheduleObj.eventLocation.push(tmpStr);

        // home or away game
        if(!row.location_status) {
            scheduleObj.locationStatus.push('-');
        }
        else {
            scheduleObj.locationStatus.push(row.location_status);
        };

        rows[tmpCnt] = scheduleObj;
        tmpCnt++;
    });

    // console.log(scheduleObj)
    // console.log(rows)
    // //await client.end();
    return rows;

    
};