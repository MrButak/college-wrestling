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

    console.log(school, 'working in dbmanager.js');
    // const text = 'SELECT * FROM cities WHERE name ILIKE ($1) AND country ILIKE ($2) LIMIT 30';
    // const values = [cityName + "%", countryName];
    // const res = await client.query(text, values);
    // //await client.end();
    // return res.rows; 
};