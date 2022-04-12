<template>


<div v-if="displayScheduleData" class="flex flex-1 flex-col items-center w-full gap-12">
    <table id="schedule-table" class="table-fixed shadow-lg bg-white border-collapse">
        <thead>
            <tr>
                <span v-for="header in dskTableHeaders">
                    <th class="bg-blue-100 border text-left px-8 py-4">{{ header }}</th>
                </span>
            </tr>
        </thead>
        <tbody>
            <tr v-for="data in scheduleData">
                <span v-for="text in data">
                    <!-- <td v-if="text.length > 1" class="border px-8 py-4">
                        <span v-for="item in text">
                            {{ item }}
                        </span>
                    </td> -->
                    <!-- <span v-else> -->
                        <td class="border px-8 py-4">{{ text[0] }}</td>
                    <!-- </span> -->
                </span>
            </tr>
        </tbody>
    </table>
    
    <!-- <span v-for="data in scheduleData">
        <span v-for="text in data">
        
            <span v-if="text.length > 1">
                <span v-for="item in text">
                    {{ item }}
                </span>
                
            </span>
            <span v-else>
                {{ text[0] }}
            </span>
        </span>
    </span> -->

    

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

let dskTableHeaders = ['Date', 'Time', 'Type', 'Event Name', 'Opponent', 'Win', 'Score'];

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
