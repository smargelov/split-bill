<template>
	<div class="edit-bill">
		<edit-bill-form v-model:form="form" :initial-bill="initialBill" @on-save="onSave">
			<template #members-score>
				<members-score v-model:bill="form" />
			</template>
		</edit-bill-form>
		<json-bill-form v-model:form="form" />
	</div>
</template>

<script setup lang="ts">
import type { IBill } from '@/types/bill.ts'

const form = defineModel<IBill>('form', { required: true })

defineProps<{
	initialBill: IBill
}>()

const emit = defineEmits<{
	(e: 'on-save'): void
}>()

const onSave = () => {
	emit('on-save')
}
</script>

<style lang="scss" scoped>
.edit-bill {
	display: grid;
	gap: 1rem;
}
</style>
