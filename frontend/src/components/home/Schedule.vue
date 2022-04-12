<template>


<div v-if="displayScheduleData" class="flex flex-1 flex-col items-center w-full gap-12">
    <table id="schedule-table">
        <thead>
            <tr>
                <span v-for="header in dskTableHeaders">
                    <th>{{ header }}</th>
                </span>
            </tr>
        </thead>
        <tbody> 
            <tr>
                
            </tr>
            
        </tbody>
    </table>
    
    <span v-for="data in scheduleData">
        <span v-for="text in data">
        
            <span v-if="text.length > 1">
                
                {{ text }}
            </span>
            <span v-else>
                {{ text[0] }}
            </span>
        </span>
    </span>

    <!-- <span v-for="data in scheduleData">
        <span v-for="counter in Object.keys(scheduleData).length">
        
            <p v-for="text in data[counter]">
                {{ text }}
            </p>
        </span>
    </span> -->
    
</div>




</template>

<script setup>

import { ref, computed, onMounted } from 'vue';

let dskTableHeaders = ['Date/Times', 'Type', 'Event Name', 'Opponent/Participants', 'Win', 'Score'];

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
