<template>


<div class="flex flex-col items-center w-full gap-12 mt-12">

    <select class="text-center w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
        <option value="schedule" selected>
            Schedule
        </option>
    </select>

    
    <div class="flex gap-12 text-center">

        <div class="flex flex-col">
            <text>Conference</text>
            <select v-model="conference" class="text-center uppercase block w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                <option v-for="c in conferences">
                    {{ c }}
                </option>
            </select>
        </div>

        <div class="flex flex-col">
            <text>School</text>
            <select v-model="school" class="text-center block w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                <option v-if="!displaySchools">Schools</option>
                <option v-if="displaySchools" v-for="sch in schools">
                    {{ sch }} 
                </option>
            </select>
        </div>

    </div>

    <button @click="getSchoolInfo($event)" class="block w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">Go</button>
</div>

<div class="pt-6">
<Schedule ref="scheduleComponent" />
</div>


</template>


<script async setup>

import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Schedule from './Schedule.vue';


let conference = ref();
let school = ref();
let displaySchools = computed(() => {
    return conference.value ? true: false;
});

let conferences = computed(() => Object.keys(conAndSchObject));
let schools = computed(() => conAndSchObject[conference.value]);


// to call functions in Schedule.vue component
let scheduleComponent = ref(Schedule); 
defineExpose({
     Schedule
 });



onMounted(() => {


});

async function getSchoolInfo(event) {

    // backend call for db query
    let response = await axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/schedule',
        params: {
            schoolName: school.value
        }
    })
    
    scheduleComponent.value.displaySchedule(response.data, school.value);
};

let conAndSchObject = {
    
    bigten: [
      'Illinois',     'Indiana',
      'Iowa',         'Maryland',
      'Michigan',     'Michigan State',
      'Minnesota',    'Nebraska',
      'Northwestern', 'Ohio State',
      'Pennsylvania', 'Purdue',
      'Rutgers',      'Wisconsin'
    ],
    big12: [
      'Air Force',
      'Cal Baptist',
      'Iowa State',
      'Missouri',
      'North Dakota State',
      'Northern Colorado',
      'Northern Iowa',
      'Oklahoma',
      'Oklahoma State',
      'South Dakota State',
      'Utah Valley',
      'West Virginia',
      'Wyoming'
    ],
    acc: [
      'Duke',
      'North Carolina',
      'North Carolina State',
      'Pittsburgh',
      'Virginia',
      'VMI'
    ],
    eiwa: [
      'American',            'Army',
      'Binghamton',          'Brown',
      'Bucknell',            'Columbia',
      'Cornell',             'Drexel',
      'Franklin & Marshall', 'Harvard',
      'Hofstra',             'Lehigh',
      'LIU',                 'Navy',
      'Penn State',          'Princeton',
      'Sacred Heart'
    ],
    mac: [
      'Bloomsburg',
      'Buffalo',
      'Central Michigan',
      'Clarion',
      'Cleveland State',
      'Edinboro',
      'George Mason',
      'Kent State',
      'Lock Haven',
      'Northern Illinois',
      'Ohio',
      'Rider',
      'Southern Illinois Edwardsville'
    ],
    pac12: [
      'Arizona State',
      'Cal Poly',
      'CSU Bakersfield',
      'Little Rock',
      'Oregon State',
      'Stanford'
    ],
    socon: [
      'Appalachian State',
      'Bellarmine',
      'Campbell',
      'Chattanooga',
      'Davidson',
      'Gardner-Webb',
      'Presbyterian',
      'The Citadel',
      'Virginia Tech'
    ]
  };
</script>



<style>

</style>
