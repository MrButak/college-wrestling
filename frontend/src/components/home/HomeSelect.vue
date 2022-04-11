<template>


<div class="flex flex-col items-center w-full gap-12 mt-12">

    <select class="text-center w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
        <option value="schedule" selected>
            Schedule
        </option>
    </select>

    <!-- conferences and schools SELECT elements -->
    <div class="flex gap-12">
        <select v-model="conference" class="text-center block w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option v-bind:value="key" v-for="(value, key) in conAndSchObject">{{ key.toUpperCase() }}
            </option>
        </select>

        <select class="text-center block w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="animals">
        </select>
    </div>

    <button @click="getSchoolInfo($event)" class="block w-32 sm:w-64 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">Go</button>

<Schedule ref="scheduleComponent" />

</div>

</template>

<script async setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Schedule from './Schedule.vue';


let conference = ref()
// let schools = computed(() => )


// to call functions in Schedule.vue component
let scheduleComponent = ref(Schedule); 
defineExpose({
     Schedule
 });

let conAndSchObject = {
        bigten: ['Illinois', 'Indiana', 'University of Iowa', 'Maryland', 'University of Michigan', 'Michigan State University', 'University of Minnesota', 'Nebraska', 'Northwestern University', 'Ohio State University', 'Penn State', 'Purdue University', 'Rutgers', 'Wisconsin'],
        big12: ['Iowa State University', 'University of Missouri', 'North Dakota State University', 'University of Northern Colorado', 'University of Northern Iowa', 'Oklahoma State', 'South Dakota State University', 'Air Force', 'Utah Valley University', 'West Virginia University', 'University of Wyoming', 'University of Oklahoma'],
        acc: ['Duke University', 'NC State', 'North Carolina', 'University of Pittsburgh', 'University of Virginia', 'Virginia Tech'],
        eiwa: ['American University', 'Binghamton University', 'Brown University', 'Bucknell University', 'Columbia University', 'Cornell University', 'Drexel University', 'Franklin & Marshall College', 'Harvard University', 'Hofstra University', 'Lehigh University', 'Long Island University', 'University of Pennsylvania', 'Princeton University', 'Sacred Heart University', 'Army', 'Navy'],
        mac: ['Bloomsburg University of Pennsylvania', 'University at Buffalo', 'Central Michigan University', 'Clarion University of Pennsylvania', 'Cleveland State University', 'Edinboro University of Pennsylvania', 'George Mason University', 'Kent State University', 'Lock Haven University of Pennsylvania', 'Northern Illinois University', 'Ohio University', 'Rider University', 'SIU Edwardsville'],
        pac12: ['Arizona State University', 'Cal Poly', 'California State University, Bakersfield', 'Little Rock', 'Oregon State University', 'Stanford University'],
        socon: ['Appalachian State University', 'Campbell University', 'The Citadel', 'Davidson College', 'Gardner-Webb University', 'Presbyterian College', 'Chattanooga', 'Virginia Military Institute']
};

onMounted(() => {


});

// function async getSchoolInfo(event) {


// };
</script>



<style>

</style>
