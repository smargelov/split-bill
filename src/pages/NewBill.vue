<template>
	<l-page :title="pageTitle">
		<edit-bill v-model:form="form" />
	</l-page>
</template>

<script setup lang="ts">
import type { IBill } from '@/types/bill.ts'
import EditBill from '@/components/EditBill.vue'
import { useInitialBillItem } from '@/composables/useInitialBillItem.ts'

const pageTitle = 'Новый чек'

const { initialBillItem } = useInitialBillItem()

const initialBill: IBill = {
	id: '',
	date: '',
	place: '',
	persons: [],
	orderList: [initialBillItem],
	currency: '',
	summary: 0,
	service: 0,
	total: 0,
	tips: 0,
	paid: 0,
}

const draft = useStorage('draft', initialBill, undefined, {
	serializer: {
		read: (v: string) => (v ? JSON.parse(v) : null),
		write: (v: IBill) => JSON.stringify(v),
	},
})

const form = ref<IBill>(initialBill)

onMounted(() => {
	if (draft.value) {
		form.value = draft.value
	}
})

watch(
	form,
	(value) => {
		draft.value = value
	},
	{ deep: true }
)

const removeDraft = () => {
	draft.value = null
}

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
	display: grid;
}
</style>
