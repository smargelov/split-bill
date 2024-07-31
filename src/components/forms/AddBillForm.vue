<template>
	<el-form :model="form" class="add-form" label-position="top">
		<el-form-item label="Дата">
			<el-date-picker
				v-model="form.date"
				type="datetime"
				placeholder="Выбрать дату"
				size="large"
			/>
		</el-form-item>
		<el-form-item label="Заведение">
			<el-input v-model="form.place" type="text" size="large" />
		</el-form-item>
		<el-form-item label="Участники">
			<el-select
				v-model="form.persons"
				:reserve-keyword="false"
				size="large"
				placeholder="Выбрать или внести участников"
				multiple
				filterable
				allow-create
				default-first-option
				@change="personHandler"
			>
				<el-option
					v-for="person in persons"
					:key="person"
					:label="person"
					:value="person"
				/>
			</el-select>
		</el-form-item>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="Сумма">
					<el-input v-model="form.summary" type="number" size="large" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="Сервис">
					<el-input v-model="form.service" type="number" size="large" />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="Итого">
					<el-input v-model="form.total" type="number" size="large" />
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider />
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="Чаевые">
					<el-input v-model="form.tips" type="number" size="large" />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="Оплатили">
					<el-input v-model="form.paid" type="number" size="large" />
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script setup lang="ts">
import type { IBill } from '@/types/bill.ts'
import { usePerson } from '@/composables/usePerson.ts'

const form = defineModel<IBill>('form', { required: true })

const { persons } = usePerson()

const personHandler = (newPersons: string[]) => {
	persons.value = newPersons
}
</script>

<style lang="scss" scoped>
.add-bill-form {
	display: grid;
}
</style>
