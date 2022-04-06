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

    
    const text = 'SELECT * FROM events';
    // const values = [cityName + "%", countryName];
    const res = await client.query(text);
    // //await client.end();
    
    return res.rows; 
};