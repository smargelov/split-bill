<template>
	<l-page :title="pageTitle">
		<detail-bill v-if="!isEditMode" :bill="bill" @go-to-edit-mode="goToEditMode" />
		<edit-bill v-if="form && isEditMode" v-model:form="form" @on-save="onSave" />
	</l-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useBillStore } from '@/composables/useBillStore.ts'
import type { IBill } from '@/types/bill.ts'

const route = useRoute()
const id = route.params.id
const pageTitle = `Чек #${id}`

const { bill, updateBill } = useBillStore(id as string)

const form = ref<Nullable<IBill>>(bill.value ?? null)

const isEditMode = ref(false)
const goToEditMode = () => {
	isEditMode.value = true
}

const onSave = () => {
	if (form.value) {
		isEditMode.value = false
		updateBill(form.value)
	}
}
</script>
