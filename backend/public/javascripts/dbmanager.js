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
        dates: [],
        times: [],
        type: '',
        name: '',
        opponent: '',
        win: '',
        score: [],
        oppScore: [],
        placement: [],
        placementOutOf: []
    };

    let seasonDates = '{"2021-08-01", "2022-07-01"}'
    const text = 'SELECT * FROM events JOIN seasons ON (events.season_id = seasons.season_id) JOIN schools ON (events.school_id = schools.school_id) WHERE seasons.season_dates = ($1) AND schools.short_name ILIKE ($2) ORDER BY event_dates[1] ASC'
    let values = [seasonDates, school];
    const res = await client.query(text, values);

    res.rows.forEach((row) => {
        console.log(row)
        
    });

    console.log(scheduleObj)

    // //await client.end();
    // return res.rows; 
};