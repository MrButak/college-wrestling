<template>

<div class="flex flex-1 flex-col items-center w-full gap-12">
    <table id="schedule-table">
        <thead>
            <tr>
                <span v-for="header in dskTableHeaders">
                    <th>{{ header }}</th>
                </span>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
</div>
</template>

<script setup>

import { ref, onMounted } from 'vue';

let dskTableHeaders = ['Date/Times', 'Type', 'Event Name', 'Opponent/Participants', 'Win', 'Score'];

onMounted(() => {


});




let displaySchedule = (scheduleData) => {

   console.log(scheduleData)
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
