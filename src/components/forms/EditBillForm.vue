<template>
	<el-form ref="formRef" :model="form" :rules="rules" class="add-form" label-position="top">
		<el-form-item label="Дата" prop="date">
			<el-date-picker
				v-model="form.date"
				type="datetime"
				placeholder="Выбрать дату"
				size="large"
			/>
		</el-form-item>
		<el-form-item label="Заведение" prop="place">
			<el-input v-model="form.place" type="text" size="large" />
		</el-form-item>
		<el-form-item label="Участники" prop="persons">
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
		<el-divider content-position="left">Элементы</el-divider>
		<div class="add-form__items">
			<bill-item
				v-for="(_, index) in form.orderList"
				:key="index"
				v-model="form.orderList[index]"
				:persons="form.persons"
				:position="index"
				:rules="orderListRules"
			/>
		</div>
		<el-form-item>
			<el-button-group>
				<el-button :icon="CirclePlus" type="primary" text bg @click="addNewBillItem">
					Добавить
				</el-button>
				<el-button
					v-if="form.orderList?.length > 1"
					:icon="Delete"
					type="danger"
					text
					bg
					@click="removeLastBillItem"
				>
					Удалить последний
				</el-button>
			</el-button-group>
		</el-form-item>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="Сумма" prop="summary">
					<el-input v-model.number="form.summary" type="number" size="large" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="Сервис" prop="service">
					<el-input v-model.number="form.service" type="number" size="large" />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="Итого" prop="total">
					<el-input v-model.number="form.total" type="number" size="large" />
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider />
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="Чаевые" prop="tips">
					<el-input v-model.number="form.tips" type="number" size="large" />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="Оплатили" prop="paid">
					<el-input v-model.number="form.paid" type="number" size="large" />
				</el-form-item>
			</el-col>
		</el-row>
		<el-button-group>
			<el-button :icon="DocumentAdd" type="success" @click="onSave"> Сохранить</el-button>
		</el-button-group>
	</el-form>
</template>

<script setup lang="ts">
import type { IBill } from '@/types/bill.ts'
import { usePerson } from '@/composables/usePerson.ts'
import { CirclePlus, Delete, DocumentAdd } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance } from 'element-plus'
import BillItem from '@/components/forms/BillItem.vue'
import { useInitialBillItem } from '@/composables/useInitialBillItem.ts'
import { useEditFormValidation } from '@/composables/useEditFormValidation.ts'
import { useOnValidate } from '@/composables/useOnValidate.ts'

const form = defineModel<IBill>('form', { required: true })

const emit = defineEmits<{
	(e: 'on-save'): void
}>()

const { initialBillItem } = useInitialBillItem()

const { persons } = usePerson()

const personHandler = (newPersons: string[]) => {
	persons.value = newPersons
}

const formRef = ref<FormInstance>()
const addNewBillItem = () => {
	form.value.orderList.push(initialBillItem)
	formRef.value?.clearValidate()
}
const removeLastBillItem = () => {
	form.value.orderList.pop()
}

const { rules, orderListRules } = useEditFormValidation(form, formRef.value)
const onSave = async () => {
	try {
		await useOnValidate(formRef.value, 'Ошибка заполнения формы')
		emit('on-save')
		ElMessage.success('Чек успешно добавлен')
	} catch (error) {
		ElMessage.error((error as Error).message)
	}
}
</script>

<style lang="scss" scoped>
.add-form {
	display: grid;

	&__items {
		display: grid;
		gap: 1rem;
		margin-bottom: 1rem;
	}
}
</style>
