<template>

<div class="space-y-2">
	
	<div class="bg-white shadow-lg hover:shadow-xl rounded overflow-x-scroll p-3">
		<table class="table flex flex-col flex-no-wrap table-auto w-full leading-normal">

			<thead class="uppercase text-xs font-semibold text-gray-600 bg-gray-200">
				<tr class="hidden md:table-row">
					<th v-for="count in dskTableHeaders.length - 1" class="text-left p-2">
						<p>{{ dskTableHeaders[count - 1] }}</p>	
					</th>
					<th class="text-right p-2">
						<p>{{ dskTableHeaders[dskTableHeaders.length - 1] }}</p>	
					</th>
					
					<th></th>
				</tr>
			</thead>

			<tbody class="flex-1 sm:flex-none">

				<tr v-for="data in scheduleData" class="border flex p-2 hover:bg-gray-100 md:table-row flex-col flex-no-wrap">
					<td class="p-2 border">
						<p v-for="date in data.dates" class="truncate ...">
							{{ date }}
						</p>
					</td>

					<td class="p-2 border">
						<p v-for="time in data.times" class="truncate ...">
							{{ time }}
						</p>
					</td>
					<td class="p-2 border">
						<p class="truncate ...">
							{{ data.type[0].toUpperCase() }}
						</p>
					</td>
					<td class="p-2 border">
						<p class="truncate ...">
							{{ data.name[0] }}
						</p>
					</td>
					<td class="p-2 border">
						<p class="truncate ...">
							{{ data.opponent[0] }}
						</p>
					</td>
					<td class="p-2 border">
						<p class="truncate ...">
							{{ data.points[0] }}
						</p>
					</td>
					<td class="p-2 border">
						<p class="truncate ...">
							{{ data.placement[0] }}
						</p>
					</td>
					<td class="p-2 border">
						<p class="truncate ...">
							{{ data.eventLocation[0] }}
						</p>
					</td>
					
					<td class="p-2 md:text-right">
						<div>
							{{ data.win[0] }}
						</div>
					</td>
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

let dskTableHeaders = ['Date', 'Time', 'Type', 'Event Name', 'Opponent', 'Points', 'Placement', 'Location', 'Win'];

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
