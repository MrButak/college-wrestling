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
            locationStatus: {}
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
        // scheduleObj.city.push(row.city);
        // scheduleObj.state.push(row.state);

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
    console.log(rows)
    // //await client.end();
    return rows;

    // // parse data from db call to object, to make it easier to display on dom
    // res.rows.forEach((row) => {
    //     scheduleObj = {
    //         dates: {},
    //         times: {},
    //         type: {},
    //         name: {},
    //         opponent: {},
    //         win: {},
    //         points: {},
    //         oppPoints: {},
    //         placement: {},
    //         placementOutOf: {},
    //         city: {},
    //         state: {},
    //         locationStatus: {}
    //     };
    //     // scheduleObj.dates[tmpCnt] = [];
    //     // scheduleObj.times[tmpCnt] = [];
    //     // scheduleObj.type[tmpCnt] = [];
    //     // scheduleObj.name[tmpCnt] = [];
    //     // scheduleObj.opponent[tmpCnt] = [];
    //     // scheduleObj.win[tmpCnt] = [];
    //     // scheduleObj.points[tmpCnt] = [];
    //     // scheduleObj.oppPoints[tmpCnt] = [];
    //     // scheduleObj.placement[tmpCnt] = [];
    //     // scheduleObj.placementOutOf[tmpCnt] = [];
    //     // scheduleObj.city[tmpCnt] = [];
    //     // scheduleObj.state[tmpCnt] = [];
    //     // scheduleObj.locationStatus[tmpCnt] = [];
    //     scheduleObj.dates = [];
    //     scheduleObj.times = [];
    //     scheduleObj.type = [];
    //     scheduleObj.name = [];
    //     scheduleObj.opponent = [];
    //     scheduleObj.win = [];
    //     scheduleObj.points = [];
    //     scheduleObj.oppPoints = [];
    //     scheduleObj.placement = [];
    //     scheduleObj.placementOutOf = [];
    //     scheduleObj.city = [];
    //     scheduleObj.state = [];
    //     scheduleObj.locationStatus = [];

    //     // dates
    //     row.event_dates.forEach((date) => {
    //         // scheduleObj.dates[tmpCnt].push(date.toISOString().slice(5, 10));
    //         scheduleObj.dates.push(date.toISOString().slice(5, 10));
    //     });
        
    //     // times
    //     row.event_times.forEach((time) => {
    //         if(typeof(time) === 'object') {
    //             time.forEach((t) => {
    //                 // scheduleObj.times[tmpCnt].push(t.slice(0, 5));
    //                 scheduleObj.times.push(t.slice(0, 5));
    //             });
    //         }
    //         else {
    //             // scheduleObj.times[tmpCnt].push(time.slice(0, 5));
    //             scheduleObj.times.push(time.slice(0, 5));
    //         };
    //     });

    //     // event type
    //     // scheduleObj.type[tmpCnt].push(row.event_type);
    //     scheduleObj.type.push(row.event_type);

    //     // event name
    //     if(!row.event_name) {
    //         // scheduleObj.name[tmpCnt].push('');
    //         scheduleObj.name.push('');
    //     }
    //     else {
    //         // scheduleObj.name[tmpCnt].push(row.event_name);
    //         scheduleObj.name.push(row.event_name);
    //     };

    //     // opponent
    //     if(!row.opponent_school_short_name) {
    //         // scheduleObj.opponent[tmpCnt].push('');
    //         scheduleObj.opponent.push('');
    //     }
    //     else {
    //         // scheduleObj.opponent[tmpCnt].push(row.opponent_school_short_name);
    //         scheduleObj.opponent.push(row.opponent_school_short_name);
    //     };

    //     // win / lose & points
    //     if(!row.points) {
    //         // scheduleObj.win[tmpCnt].push('');
    //         // scheduleObj.points[tmpCnt].push('');
    //         // scheduleObj.oppPoints[tmpCnt].push('');
    //         scheduleObj.win.push('');
    //         scheduleObj.points.push('');
    //         scheduleObj.oppPoints.push('');
    //     }
    //     else {
    //         if(row.points > row.opponent_points) {
    //             // scheduleObj.win[tmpCnt].push('W');
    //             scheduleObj.win.push('W');
    //         }
    //         else {
    //             // scheduleObj.win[tmpCnt].push('L');
    //             scheduleObj.win.push('L');
    //         };
    //         // scheduleObj.points[tmpCnt].push(row.points);
    //         // scheduleObj.oppPoints[tmpCnt].push(row.opponent_points);
    //         scheduleObj.points.push(row.points);
    //         scheduleObj.oppPoints.push(row.opponent_points);
    //     };

    //     // tournament placement
    //     if(!row.placement) {
    //         // scheduleObj.placement[tmpCnt].push('');
    //         // scheduleObj.placementOutOf[tmpCnt].push('');
    //         scheduleObj.placement.push('');
    //         scheduleObj.placementOutOf.push('');
    //     }
    //     else {
    //         // scheduleObj.placement[tmpCnt].push(row.placement[0]);
    //         // scheduleObj.placementOutOf[tmpCnt].push(row.placement[1]);
    //         scheduleObj.placement.push(row.placement[0]);
    //         scheduleObj.placementOutOf.push(row.placement[1]);
    //     };

    //     // city and state
    //     // scheduleObj.city[tmpCnt].push(row.city);
    //     // scheduleObj.state[tmpCnt].push(row.state);
    //     scheduleObj.city.push(row.city);
    //     scheduleObj.state.push(row.state);

    //     // home or away game
    //     if(!row.location_status) {
    //         // scheduleObj.locationStatus[tmpCnt].push('');
    //         scheduleObj.locationStatus.push('');
    //     }
    //     else {
    //         // scheduleObj.locationStatus[tmpCnt].push(row.location_status);
    //         scheduleObj.locationStatus.push(row.location_status);
    //     };

    //     rows[tmpCnt] = scheduleObj;
    //     tmpCnt++;
    // });
};