<template>
	<div class="app">
		<main class="app__main">
			<router-view />
		</main>
		<the-footer class="app__footer" />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app {
	display: grid;
	width: 100%;
	min-height: 100svh;
	padding: 2rem;
	background-color: var(--main-bg-color);

	&__main {
		width: 100%;
		max-width: 90ch;
		margin-inline: auto;
	}

	&__footer {
		position: fixed;
		inset: auto 0 0;
	}
}
</style>
