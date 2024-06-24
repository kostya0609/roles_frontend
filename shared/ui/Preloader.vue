<template>
	<div
		v-loading="loading"
		:element-loading-text="loadingText"
		:element-loading-spinner="svg"
		element-loading-svg-view-box="-10, -10, 50, 50"
	>
		<slot />
	</div>
</template>
<script setup>
defineProps({
	loading: {
		type: Boolean,
		default: false,
	},
	loadingText: {
		type: String,
		default: 'Загрузка данных...',
	}
});

const svg = `
		  <path class="path" d="
			M 30 15
			L 28 17
			M 25.61 25.61
			A 15 15, 0, 0, 1, 15 30
			A 15 15, 0, 1, 1, 27.99 7.5
			L 15 15
		  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
		`;
</script>