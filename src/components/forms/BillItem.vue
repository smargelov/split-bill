<template>
	<el-card class="bill-item">
		<el-form-item
			:label="`${position + 1}. Наименование`"
			:rules="rules.originalName"
			:prop="`orderList.${position}.originalName`"
		>
			<el-input v-model="item.originalName" />
		</el-form-item>
		<el-form-item
			:rules="rules.ruName"
			:prop="`orderList.${position}.ruName`"
			label="По-русски"
		>
			<el-input v-model="item.ruName" />
		</el-form-item>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item
					:rules="rules.quantity"
					:prop="`orderList.${position}.quantity`"
					label="Количество"
				>
					<el-input v-model.number="item.quantity" min="1" type="number" />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item
					:rules="rules.price"
					:prop="`orderList.${position}.price`"
					label="Цена"
				>
					<el-input v-model.number="item.price" type="number" />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item :rules="rules.sum" :prop="`orderList.${position}.sum`" label="Сумма">
					<el-input v-model.number="item.sum" type="number" disabled />
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
import type { FormRules } from 'element-plus'

const item = defineModel<IBillItem>({ required: true })

defineProps<{
	persons: string[]
	position: number
	rules: FormRules<IBillItem>
}>()
</script>

<style lang="scss" scoped>
.bill-item {
	display: grid;
}
</style>
