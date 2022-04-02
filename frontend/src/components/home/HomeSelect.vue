<template>


<div class="flex flex-col items-center w-full gap-12">

    <select class="text-center w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="animals">
        <option value="">
            Schedule
        </option>
        <option value="dog">
            Roster
        </option>
        <option value="cat">
            All
        </option>
    </select>

    <div class="flex gap-12">
        <select @change="conferenceSelected($event)" id="conferences-select" class="text-center block w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="animals">
            <option value="conference">
                Conference
            </option>
            <option value="bigten">
                Big Ten
            </option>
            <option value="big12">
                Big 12
            </option>
            <option value="acc">
                ACC
            </option>
            <option value="eiwa">
                EIWA
            </option>
            <option value="mac">
                MAC
            </option>
            <option value="pac12">
                PAC-12
            </option>
            <option value="socon">
                SoCon
            </option>
        </select>

        <select id="schools-select" class="text-center block w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="animals">
            <option selected value="school">
                School
            </option>
        </select>
    </div>
    <button @click="getSchoolInfo($event)" class="block w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">Go</button>

</div>

</template>

<script setup>import { ref, onMounted } from 'vue';


let conferenceValue;
let schoolValue;
let schoolsObject;

onMounted(() => {

    setComponentVariables();

});

function setComponentVariables() {

    conferenceValue = document.getElementById('conferences-select');
    schoolValue = document.getElementById('schools-select');
    
    schoolsObject = {
        bigten: ['Illinois', 'Indiana', 'University of Iowa', 'Maryland', 'University of Michigan', 'Michigan State University', 'University of Minnesota', 'Nebraska', 'Northwestern University', 'Ohio State University', 'Penn State', 'Purdue University', 'Rutgers', 'Wisconsin'],
        big12: ['Iowa State University', 'University of Missouri', 'North Dakota State University', 'University of Northern Colorado', 'University of Northern Iowa', 'Oklahoma State', 'South Dakota State University', 'Air Force', 'Utah Valley University', 'West Virginia University', 'University of Wyoming', 'University of Oklahoma'],
        acc: ['Duke University', 'NC State', 'North Carolina', 'University of Pittsburgh', 'University of Virginia', 'Virginia Tech'],
        eiwa: ['American University', 'Binghamton University', 'Brown University', 'Bucknell University', 'Columbia University', 'Cornell University', 'Drexel University', 'Franklin & Marshall College', 'Harvard University', 'Hofstra University', 'Lehigh University', 'Long Island University', 'University of Pennsylvania', 'Princeton University', 'Sacred Heart University', 'Army', 'Navy'],
        mac: ['Bloomsburg University of Pennsylvania', 'University at Buffalo', 'Central Michigan University', 'Clarion University of Pennsylvania', 'Cleveland State University', 'Edinboro University of Pennsylvania', 'George Mason University', 'Kent State University', 'Lock Haven University of Pennsylvania', 'Northern Illinois University', 'Ohio University', 'Rider University', 'SIU Edwardsville'],
        pac12: ['Arizona State University', 'Cal Poly', 'California State University, Bakersfield', 'Little Rock', 'Oregon State University', 'Stanford University'],
        socon: ['Appalachian State University', 'Campbell University', 'The Citadel', 'Davidson College', 'Gardner-Webb University', 'Presbyterian College', 'Chattanooga', 'Virginia Military Institute']
    };
};

function conferenceSelected() {

    let selectElement;
    let conferencesArry = [];

    // clear previous options from schools select element (if any)
    while(schoolValue.firstChild) {
        schoolValue.removeChild(schoolValue.firstChild)
    };

    // populate school select element with all schools from conference selected by user
    Object.keys(schoolsObject).forEach((school) => {
        conferencesArry.push(school);
    });
    
    for(let i = 0; i < conferencesArry.length; i++) {

        if(conferencesArry[i] === conferenceValue.value) {

            for(let j = 0; j < schoolsObject[`${conferencesArry[i]}`].length; j++) {

                selectElement = document.createElement('option');
                // remove whitespace and set to lower case
                selectElement.value = schoolsObject[`${conferencesArry[i]}`][j].replace(/\s+/g, '').toLowerCase();
                selectElement.text = schoolsObject[`${conferencesArry[i]}`][j];
                schoolValue.append(selectElement);
            };
            break;
        }

        // add default 'School' option if no conference selected
        else if(conferenceValue.value === 'conference') {
            
            selectElement = document.createElement('option');
            selectElement.value = 'school';
            selectElement.text = 'School';
            schoolValue.append(selectElement);
            break;
        };
    };
};

function getSchoolInfo() {

    if(schoolValue.value === 'school') {

        console.log('Select a school first!');
        return;
    };
    

    
};

</script>

<style>

</style>