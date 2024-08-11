<template>
	<div class="app">
		<main class="app__main">
			<router-view />
		</main>
		<the-footer class="app__footer" />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import '@/assets/styles/base';
</style>

<style lang="scss" scoped>
.app {
	display: grid;
	grid-template-rows: 1fr min-content;
	gap: 2rem;
	width: 100%;
	min-height: 100dvh;
	padding: 2rem 1.5rem 0;
	background-color: var(--main-bg-color);

	&__main {
		width: 100%;
		max-width: 90ch;
		margin-inline: auto;
	}

	&__footer {
		position: sticky;
		bottom: 0;
		z-index: 10;
	}
}
</style>
