<template>
	<l-page :title="pageTitle">
		<el-tabs v-model="activeTab" class="demo-tabs">
			<el-tab-pane label="Вручную" name="manually">
				<add-bill-form v-model:form="form" />
			</el-tab-pane>
			<el-tab-pane label="JSON" name="json">
				<json-bill-form
					v-model:form="form"
					:is-json-tab-active="isJsonTabActive"
					@on-save="goToManually"
				/>
			</el-tab-pane>
		</el-tabs>
	</l-page>
</template>

<script setup lang="ts">
import AddBillForm from '@/components/forms/AddBillForm.vue'
import type { IBill } from '@/types/bill.ts'
import JsonBillForm from '@/components/forms/JsonBillForm.vue'

const pageTitle = 'Новый чек'

const activeTab = ref('manually')
const goToManually = () => (activeTab.value = 'manually')
const isJsonTabActive = computed(() => activeTab.value === 'json')

const initialBill: IBill = {
	id: '',
	date: '',
	place: '',
	persons: [],
	orderList: [
		{
			id: '',
			originalName: '',
			ruName: '',
			quantity: 0,
			price: 0,
			sum: 0,
			members: [],
		},
	],
	currency: '',
	summary: 0,
	service: 0,
	total: 0,
	tips: 0,
	paid: 0,
}

const form = ref<IBill>(initialBill)

const test = {
	id: '0001',
	date: '2023-06-15T21:10',
	place: '7M',
	persons: [],
	orderList: [
		{
			originalName: 'Smoked Salmon Penne',
			ruName: 'Пенне с копченым лососем',
			quantity: 2,
			price: 28,
			sum: 56,
			members: [],
		},
		{
			originalName: 'Four Cheese Penne',
			ruName: 'Пенне с четырьмя сырами',
			quantity: 1,
			price: 28,
			sum: 28,
			members: [],
		},
		{
			originalName: 'Fettuccine Norcina',
			ruName: 'Феттучини Норчина',
			quantity: 1,
			price: 26,
			sum: 26,
			members: [],
		},
		{
			originalName: 'House Made Hummus',
			ruName: 'Домашний хумус',
			quantity: 1,
			price: 18,
			sum: 18,
			members: [],
		},
		{
			originalName: 'Chocolate Mousse with Cherry',
			ruName: 'Шоколадный мусс с вишней',
			quantity: 1,
			price: 18,
			sum: 18,
			members: [],
		},
		{
			originalName: 'Grilled Pear & Blue Cheese',
			ruName: 'Груша на гриле с голубым сыром',
			quantity: 1,
			price: 20,
			sum: 20,
			members: [],
		},
		{
			originalName: 'Blimbap',
			ruName: 'Бибимбап',
			quantity: 1,
			price: 32,
			sum: 32,
			members: [],
		},
		{
			originalName: '0 Banchan',
			ruName: 'Закуски (Банчан)',
			quantity: 1,
			price: 0,
			sum: 0,
			members: [],
		},
		{
			originalName: 'Warm Apple Pie',
			ruName: 'Теплый яблочный пирог',
			quantity: 1,
			price: 14,
			sum: 14,
			members: [],
		},
		{
			originalName: 'Lemonade Fresh Strawberry',
			ruName: 'Лимонад со свежей клубникой',
			quantity: 1,
			price: 14,
			sum: 14,
			members: [],
		},
		{
			originalName: 'Vismino Kindzmarauli',
			ruName: 'Висмино Киндзмараули',
			quantity: 1,
			price: 50,
			sum: 50,
			members: [],
		},
	],
	currency: 'GEL',
	summary: 268,
	service: 0,
	total: 268,
	tips: 2,
	paid: 270,
}
</script>

<style lang="scss" scoped>
.add-form {
	&__json-textarea {
		width: 100%;
		min-height: 20rem;
	}
}
</style>
