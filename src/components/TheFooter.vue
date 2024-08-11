<template>
	<footer class="footer">
		<el-text type="warning" size="large" class="footer__logo">䷖ SplitBill</el-text>
		<el-button-group>
			<el-button :icon="Menu" area-label="История" text bg @click="goToPage('/bills')" />
			<el-button :icon="Plus" area-label="Добавить" text bg @click="goToPage('/')" />
			<el-button :icon="Setting" area-label="Настройки" text bg @click="openSetting" />
		</el-button-group>
		<teleport to="body">
			<el-drawer v-model="isSettingOpen" size="80%" style="max-width: 400px">
				<template #header>
					<h4>Настройки</h4>
				</template>
				<template #default>
					<drawer-content />
				</template>
			</el-drawer>
		</teleport>
	</footer>
</template>

<script setup lang="ts">
import { Menu, Plus, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import DrawerContent from '@/components/DrawerContent.vue'

useDark()

const router = useRouter()

const goToPage = (path: string) => {
	router.push(path)
}

const isSettingOpen = ref(false)
const openSetting = () => {
	isSettingOpen.value = true
}
</script>

<style lang="scss" scoped>
.footer {
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: flex-end;
	background-color: var(--footer-bg-color);
	box-shadow: 0 0 0 100vmax var(--footer-bg-color);
	backdrop-filter: blur(4px);
	clip-path: inset(0 -100vmax);
	padding-block: 1rem;

	&__logo {
		margin-right: auto;
	}
}
</style>
