<template>
	<div class="page">
		<h1 class="page__title">{{ title }}</h1>
		<article class="page__content">
			<slot />
		</article>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title: string
}>()
</script>

<style lang="scss" scoped>
.page {
	display: grid;
	gap: 2rem;

	&__content {
		display: grid;
		gap: 1rem;
	}
}
</style>
