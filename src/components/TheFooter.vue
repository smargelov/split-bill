<template>
	<footer class="footer">
		<theme-switcher />
		<router-link to="/bills">История</router-link>
		<router-link to="/">Добавить</router-link>
	</footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.footer {
	display: flex;
	align-items: center;
	justify-content: space-around;
}
</style>
