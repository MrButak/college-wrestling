<template>

<div class="w-full flex justify-center">
    <h2>{{ schoolName }}</h2>
</div>

<div v-if="displayScheduleData" class="space-y-2">
	
	<div class="bg-white shadow-lg hover:shadow-xl rounded overflow-x-scroll p-3">
		<table class="table flex flex-col flex-no-wrap table-auto w-full leading-normal">

			<thead class="uppercase text-xs font-bold text-black-600 bg-gray-200">
				<tr class="hidden md:table-row">
					<th v-for="count in tableHeader.length - 1" class="text-left p-2">
						<p>{{ tableHeader[count - 1] }}</p>	
					</th>
					<th class="text-right p-2">
						<p>{{ tableHeader[tableHeader.length - 1] }}</p>	
					</th>
					<th></th>
				</tr>
			</thead>

			<tbody class="flex-1 sm:flex-none">

				<tr v-for="matchData in scheduleData" class="border flex p-2 hover:bg-gray-100 md:table-row flex-col flex-no-wrap">

                    <td class="md:hidden bg-blue-400">
                        <p class="invisible">.</p>
                    </td>

					<td class="p-2 border">
						<p class="flex justify-between truncate ...">
							{{ matchData.dates }} <text class="md:hidden text-right">Date</text>
						</p>
					</td>
					
					<td class="p-2 border">
						<p class="flex justify-between truncate ...">
							{{ matchData.type.toUpperCase() }} <text class="md:hidden text-right">Type</text>
						</p>
					</td>
					<td class="p-2 border">
						<p class="flex justify-between truncate ...">
							{{ matchData.name }} <text class="md:hidden text-right">Event Name</text>
						</p>
					</td>
					<td class="p-2 border">
						<p v-if="matchData.opponent != '-'" class="flex justify-between truncate ...">
							{{ matchData.opponent }} <text class="md:hidden text-right">Opponent</text>
						</p>
						<p v-else class="flex justify-between truncate ...">
							Team Participants <text class="md:hidden text-right">Opponent</text>
						</p>
                        
					</td>
					<td class="p-2 border">
						<p v-if="matchData.points != '-'" class="flex justify-between truncate ...">
							{{ matchData.points }} <text class="md:hidden text-right">Points</text>
						</p>
						<p v-else class="flex justify-between truncate ...">
							Match Results <text class="md:hidden text-right">Points</text>
						</p>
					</td>
					
					
					<td class="p-2 md:text-right border">
						<div class="flex justify-between">
							{{ matchData.win }} <text class="md:hidden text-right">Win</text>
						</div>
					</td>
                    
					<!-- Could use this button in the future -->
					<!-- <td class="text-right">
						<button type="button" class="inline-block text-gray-500 hover:text-gray-700">
							<svg class="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
							<path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
							</svg>
						</button>
					</td> -->
				</tr>

			</tbody>
		</table>
	</div>
</div>

</template>

<script setup>

import { ref, computed, onMounted } from 'vue';

let tableHeader = ['Date', 'Type', 'Event Name', 'Opponent', 'Points', 'Win'];

onMounted(() => {


});


let scheduleData = ref(); // returned object from db call
let schoolName = ref();
let displayScheduleData = computed(() => {
	return scheduleData.value ? true : false;
});


let displaySchedule = (scheduleRawData, chosenSchoolName) => {

    schoolName.value = chosenSchoolName;
	scheduleData.value = scheduleRawData;
	console.log(scheduleData.value)
};

// Function is called from other components
defineExpose({
	displaySchedule
});
</script>

<style>

</style>
