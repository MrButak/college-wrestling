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
        
        switch(dataObj[key].Conference.replace(' ', '').replace('-', '').toLowerCase()) {

            case 'bigten':
                newObj.bigten.push((dataObj[key].Short_Name));
                break;
            case 'big12':
                newObj.big12.push((dataObj[key].Short_Name));
                break;
            case 'acc':
                newObj.acc.push((dataObj[key].Short_Name));
                break;
            case 'eiwa':
                newObj.eiwa.push((dataObj[key].Short_Name));
                break;
            case 'mac':
                newObj.mac.push((dataObj[key].Short_Name));
                break;
            case 'pac12':
                newObj.pac12.push((dataObj[key].Short_Name));
                break;
            case 'socon':
                newObj.socon.push((dataObj[key].Short_Name));
                
        }
        
    });
    console.log(newObj)
};

// Main Function calls
async function main() {

    await getSchoolInfo()
};

main();


