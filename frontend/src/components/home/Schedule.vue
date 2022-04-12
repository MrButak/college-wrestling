<template>


<div v-if="displayScheduleData" >
    <table id="schedule-table" class="table-fixed shadow-lg bg-white border-collapse">
        <thead>
            <tr>
                <span v-for="header in dskTableHeaders">
                    <th class="w-full bg-blue-100 border text-left px-8 py-4">{{ header }}</th>
                </span>
            </tr>
        </thead>
        <tbody>
            <tr v-for="data in scheduleData">
                <span v-for="text in data">
                    <td v-if="text.length > 1" class="border text-left px-8 py-4">
                        <span v-for="item in text">
                            {{ item }}<br />
                        </span>
                    </td>
                    <span v-else>
                        <td class="border text-left px-8 py-4">{{ text[0] }}</td>
                    </span>
                </span>
            </tr>
        </tbody>
    </table>    
</div>




</template>

<script setup>

import { ref, computed, onMounted } from 'vue';

let dskTableHeaders = ['Date', 'Time', 'Type', 'Event Name', 'Opponent', 'Win', 'Score', 'temp', 'temp', 'temp'];

onMounted(() => {


});


let scheduleData = ref(); // returned object from db call

let displayScheduleData = computed(() => {
    return scheduleData.value ? true : false;
});

let displaySchedule = (scheduleRawData) => {

    scheduleData.value = scheduleRawData;
    console.log(scheduleData.value)
};

// Functions called from other components
defineExpose({
    displaySchedule
});
</script>

<style>
#schedule-table {

}
</style>
