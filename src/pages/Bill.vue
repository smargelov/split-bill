<template>
	<l-page :title="pageTitle">
		<edit-bill v-if="form" v-model:form="form" @on-save="onSave" />
	</l-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useBillStore } from '@/composables/useBillStore.ts'
import type { IBill } from '@/types/bill.ts'
import EditBill from '@/components/EditBill.vue'

const route = useRoute()
const id = route.params.id
const pageTitle = `Чек #${id}`

const { bill, updateBill } = useBillStore(id as string)

const form = ref<Nullable<IBill>>(bill.value ?? null)

const onSave = () => {
	if (form.value) {
		updateBill(form.value)
	}
}
</script>
