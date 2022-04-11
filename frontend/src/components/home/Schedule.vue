<template>

<div class="flex flex-1 flex-col items-center w-full gap-12">
    <table id="schedule-table" class="table-auto">
        
    </table>
</div>
</template>

<script setup>

import { ref, onMounted } from 'vue';



onMounted(() => {

    

});



function setComponentVariables () {


    
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
