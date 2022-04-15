const PublicGoogleSheetsParser = require('public-google-sheets-parser');
config = require('dotenv').config()
const spreadsheetId = process.env.SPREADSHEET_ID;

async function getSchoolInfo() {

    let allSchoolsObj = {
        bigten: [],
        big12: [],
        acc: [],
        eiwa: [],
        mac: [],
        pac12: [],
        socon: []
    };

    const parser = new PublicGoogleSheetsParser(spreadsheetId)
    parser.parse().then((items) => {
        parseSpreadSheedData(items, allSchoolsObj)
    });
};

function parseSpreadSheedData(dataObj, newObj) {

    Object.keys(dataObj).forEach((key) => {
        
        switch(dataObj[key].Conference.replace(' ', '').toLowerCase()) {

            case 'bigten':
                newObj.bigten.push((dataObj[key].School));
                break;
            case 'big12':
                newObj.big12.push((dataObj[key].School));
                break;
            case 'acc':
                newObj.acc.push((dataObj[key].School));
                break;
            case 'eiwa':
                newObj.eiwa.push((dataObj[key].School));
                break;
            case 'mac':
                newObj.mac.push((dataObj[key].School));
                break;
            case 'pac12':
                newObj.pac12.push((dataObj[key].School));
                break;
            case 'socon':
                newObj.socon.push((dataObj[key].School));
                
        }
        console.log(dataObj)
    });

};

// Main Function calls
async function main() {

    await getSchoolInfo()
};

main();
