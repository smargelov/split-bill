<template>
	<l-page :title="pageTitle">
		<edit-bill v-model:form="form" :initial-bill="initialBill" @on-save="onSave" />
	</l-page>
</template>

<script setup lang="ts">
import type { IBill } from '@/types/bill.ts'
import { useInitialBillItem } from '@/composables/useInitialBillItem.ts'
import { useBillsStore } from '@/composables/useBillsStore.ts'
import { useRouter } from 'vue-router'

const pageTitle = 'Новый чек'
const title = useTitle()
title.value = pageTitle

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

const form = ref<IBill>(initialBill)

const draft = useStorage('draft', initialBill, undefined, {
	serializer: {
		read: (v: string) => (v ? JSON.parse(v) : null),
		write: (v: IBill) => JSON.stringify(v),
	},
})

watch(
	form,
	(value) => {
		draft.value = value
	},
	{ deep: true }
)

onMounted(() => {
	if (draft.value) {
		form.value = draft.value
	}
})

const removeDraft = () => {
	draft.value = null
}

const { addBill } = useBillsStore()
const router = useRouter()
const onSave = () => {
	const id = addBill(form.value)
	removeDraft()
	form.value = initialBill
	router.push({ path: `/bills/${id}` })
}
</script>

<style lang="scss" scoped>
.add-form {
	display: grid;
}
</style>
