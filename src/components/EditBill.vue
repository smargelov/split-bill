<template>
	<div class="edit-bill">
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
	</div>
</template>

<script setup lang="ts">
import AddBillForm from '@/components/forms/AddBillForm.vue'
import JsonBillForm from '@/components/forms/JsonBillForm.vue'
import type { IBill, IBillItem } from '@/types/bill.ts'

const form = defineModel<IBill>('form', { required: true })

const activeTab = ref('manually')
const goToManually = () => (activeTab.value = 'manually')
const isJsonTabActive = computed(() => activeTab.value === 'json')
</script>

<style lang="scss" scoped>
.edit-bill {
	display: grid;
}
</style>
