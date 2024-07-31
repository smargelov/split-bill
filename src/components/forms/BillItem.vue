<template>
	<el-card class="bill-item">
		<el-form-item :label="`${position}. Наименование`">
			<el-input v-model="item.originalName" />
		</el-form-item>
		<el-form-item label="По-русски">
			<el-input v-model="item.ruName" />
		</el-form-item>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="Количество">
					<el-input v-model="item.quantity" type="number" />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="Цена">
					<el-input v-model="item.price" type="number" />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="Сумма">
					<el-input v-model="item.sum" type="number" disabled />
				</el-form-item>
			</el-col>
		</el-row>
		<el-form-item v-if="persons.length" label="Чей заказ">
			<el-select
				v-model="item.members"
				:reserve-keyword="false"
				placeholder="Выбрать участников"
				multiple
				filterable
				clearable
			>
				<el-option
					v-for="person in persons"
					:key="person"
					:label="person"
					:value="person"
				/>
			</el-select>
		</el-form-item>
		<el-form-item v-else>
			<el-alert
				:closable="false"
				title="Необходимо добавить участников"
				type="warning"
				show-icon
			/>
		</el-form-item>
	</el-card>
</template>

<script setup lang="ts">
import type { IBillItem } from '@/types/bill.ts'

const item = defineModel<IBillItem>({ required: true })

defineProps<{
	persons: string[]
	position: number
}>()
</script>

<style lang="scss" scoped>
.bill-item {
	display: grid;
}
</style>
