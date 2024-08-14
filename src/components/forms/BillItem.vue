<template>
	<div class="bill-item">
		<el-form-item
			:label="`${position + 1}. Название`"
			:rules="rules.name"
			:prop="`orderList.${position}.name`"
			class="bill-item__field"
			label-position="left"
		>
			<el-input v-model="item.name" size="small" />
		</el-form-item>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item
					:rules="rules.quantity"
					:prop="`orderList.${position}.quantity`"
					class="bill-item__field"
					label="Количество"
				>
					<el-input
						v-model.number="item.quantity"
						min="1"
						type="number"
						size="small"
						@change="onQuantityOrPriceChange"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item
					:rules="rules.price"
					:prop="`orderList.${position}.price`"
					class="bill-item__field"
					label="Цена"
				>
					<el-input
						v-model.number="item.price"
						type="number"
						size="small"
						@change="onQuantityOrPriceChange"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item
					:rules="rules.sum"
					:prop="`orderList.${position}.sum`"
					class="bill-item__field"
					label="Сумма"
				>
					<el-input v-model.number="item.sum" type="number" size="small" disabled />
				</el-form-item>
			</el-col>
		</el-row>
		<el-form-item v-if="persons.length" class="bill-item__field">
			<el-select
				v-model="item.members"
				:reserve-keyword="false"
				placeholder="Выбрать участников"
				size="small"
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
		<el-form-item v-else class="bill-item__field">
			<el-alert
				:closable="false"
				title="Необходимо добавить участников"
				type="warning"
				show-icon
			/>
		</el-form-item>
	</div>
</template>

<script setup lang="ts">
import type { IBillItem } from '@/types/bill.ts'
import type { FormRules } from 'element-plus'
import { roundToHundredth } from '@/utils/filters.ts'

const item = defineModel<IBillItem>({ required: true })

defineProps<{
	persons: string[]
	position: number
	rules: FormRules<IBillItem>
}>()

const onQuantityOrPriceChange = () => {
	item.value.sum = roundToHundredth(item.value.quantity * item.value.price)
}
</script>

<style lang="scss" scoped>
.bill-item {
	display: grid;

	&__field {
		margin-bottom: 1rem;
	}
}
</style>
