<template>


<div class="flex flex-col items-center w-full gap-12">



</div>

<table id="schedule-table" class="table-auto">
    <tr id="schedule-table-header">
        <th>Dates</th>
        <th>Type</th>
        <th>Name</th>
        <th>Opponent</th>
        <th>Win</th>
        <th>Score</th>
    </tr>
    <tr id="schedule-table-dates">
    </tr>
    <tr id="schedule-table-type">
    </tr>
    <tr id="schedule-table-name">
    </tr>
    <tr id="schedule-table-opponent">
    </tr>
    <tr id="schedule-table-win">
    </tr>
    <tr id="schedule-table-score">
    </tr>

</table>

</template>

<script setup>
import { ref, onMounted } from 'vue';

let scheduleHeader;
let scheduleDates;
let scheduleType;
let scheduleName;
let scheduleOpponent;
let scheduleWin;
let scheduleScore;

onMounted(() => {

    setComponentVariables();

});



function setComponentVariables () {

    scheduleHeader = document.getElementById('schedule-table-header');

    scheduleDates = document.getElementById('schedule-table-dates');
    scheduleType = document.getElementById('schedule-table-type');
    scheduleName = document.getElementById('schedule-table-name');
    scheduleOpponent = document.getElementById('schedule-table-opponent');
    scheduleWin = document.getElementById('schedule-table-win');
    scheduleScore = document.getElementById('schedule-table-score');
    
};

let displaySchedule = (scheduleData) => {

    // let tData;
    
    // let extractDate;
    // let extractType
    // let extractName
    // let extractOpponent
    // let extractWin
    // let extractScore

    // scheduleData.forEach((wrEvent) => {
    //     console.log(wrEvent)
    //     extractDate = wrEvent.dates;
    //     extractType = wrEvent.event_type;
    //     extractName = wrEvent.event_name;
    //     extractOpponent = wrEvent.o;
    //     extractName = wrEvent.event_name;
    //     extractName = wrEvent.event_name;
    //     extractName = wrEvent.event_name;

    //     // DATES
        
    //     // for events with multiple dates
    //     if(extractDate.length > 1) {

    //         let tmpStr = "";
    //         extractDate.forEach((date) => {
    //             tmpStr += date.substring(5, 10) + '/';

    //         });
    //         tData = document.createElement('td');
    //         tData.textContent = tmpStr.slice(0, -1)
    //         scheduleDates.append(tData)
            
    //     }
    //     // for event with 1 date
    //     else {
    //         extractDate.forEach((date) => {
    //             tData = document.createElement('td');
    //             tData.textContent = date.substring(5, 10);
    //             scheduleDates.append(tData);
                

    //         });
    //     };

        
    //     // extractTypes = scheduleData.event_type;
        
        
        
    //     // scheduleType.append(tData);

        
        
    //     // scheduleName.append(tData);

        
        
    //     // scheduleOpponent.append(tData);

        
        
    //     // scheduleWin.append(tData);

        
        
    //     // scheduleScore.append(tData);



    //     // switch(wrEvent.event_type) {

    //     //     case 'meet':


    //     //     case 'dual':

    //     //     case 'tournament':
            
    //     // }
        
    // })
    // console.log(scheduleDates)
    // console.log(scheduleType)

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
