<template>
	<el-form ref="formRef" :model="form" :rules="rules" class="add-form" label-position="top">
		<div class="add-form__line">
			<el-form-item label="Дата" prop="date" class="add-form__line-item add-form__field">
				<el-date-picker
					v-model="form.date"
					type="datetime"
					size="small"
					placeholder="Выбрать дату"
					class="add-form__date-picker"
				/>
			</el-form-item>
			<el-form-item
				label="Валюта"
				prop="currency"
				size="small"
				class="add-form__field add-form__line-item add-form__line-item--fit"
			>
				<el-select
					v-model="form.currency"
					:disabled="!currencies.length"
					placeholder="Выбрать или внести валюту"
					@focus="setDefaultCurrencyValue"
				>
					<el-option
						v-for="currency in currencies"
						:key="currency"
						:label="currency"
						:value="currency"
					/>
				</el-select>
			</el-form-item>
		</div>
		<el-alert
			v-if="!currencies.length"
			:closable="false"
			title="Добавьте валюту в настройках"
			type="error"
			show-icon
		/>
		<el-form-item class="add-form__field" label="Заведение" prop="place" label-position="left">
			<el-input v-model="form.place" type="text" size="small" />
		</el-form-item>
		<el-form-item class="add-form__field" prop="persons">
			<el-select
				v-model="form.persons"
				:reserve-keyword="false"
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
		<div class="add-form__items">
			<el-divider content-position="left" class="add-form__divider">Заказ</el-divider>
			<bill-item
				v-for="(_, index) in form.orderList"
				:key="index"
				v-model="form.orderList[index]"
				:persons="form.persons"
				:position="index"
				:rules="orderListRules"
			/>
		</div>
		<el-form-item class="add-form__field">
			<el-button-group class="add-form__buttons">
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
				<el-form-item class="add-form__field" label="Сумма" prop="summary">
					<el-input v-model.number="form.summary" type="number" size="small" disabled />
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item class="add-form__field" label="Сервис" prop="service">
					<el-input
						v-model.number="form.service"
						type="number"
						size="small"
						@change="onServiceChange"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item class="add-form__field" label="Итого" prop="total">
					<el-input
						v-model.number="form.total"
						type="number"
						size="small"
						@change="onSummeryChange"
					/>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item class="add-form__field" label="Чаевые" prop="tips">
					<el-input
						v-model.number="form.tips"
						type="number"
						size="small"
						@change="onTipsChange"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item class="add-form__field" label="Оплатили" prop="paid">
					<el-input
						v-model.number="form.paid"
						type="number"
						size="small"
						@change="onPaidChange"
					/>
				</el-form-item>
			</el-col>
		</el-row>
		<el-button-group class="add-form__buttons">
			<el-button v-if="!isEditMode" :icon="Brush" type="info" @click="onClear">
				Очистить
			</el-button>
			<el-button :icon="DocumentAdd" type="success" @click="onSave">
				{{ isEditMode ? 'Изменить' : 'Добавить' }}
			</el-button>
		</el-button-group>
	</el-form>
</template>

<script setup lang="ts">
import type { IBill } from '@/types/bill.ts'
import { usePerson } from '@/composables/usePerson.ts'
import { CirclePlus, Delete, DocumentAdd, Brush } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { useInitialBillItem } from '@/composables/useInitialBillItem.ts'
import { useEditFormValidation } from '@/composables/useEditFormValidation.ts'
import { useOnValidate } from '@/composables/useOnValidate.ts'
import { useCurrency } from '@/composables/useCurrency.ts'
import { roundToHundredth } from '@/utils/filters.ts'

const form = defineModel<IBill>('form', { required: true })

const props = defineProps<{
	initialBill: IBill
}>()

const emit = defineEmits<{
	(e: 'on-save'): void
}>()

const { initialBillItem } = useInitialBillItem()

const { persons } = usePerson()
const personHandler = (newPersons: string[]) => {
	persons.value = newPersons
}

const { currencies } = useCurrency()
const setDefaultCurrencyValue = () => {
	if (!form.value.currency) {
		form.value.currency = currencies.value[0]
	}
}

const addNewBillItem = () => {
	form.value.orderList.push(initialBillItem)
}
const removeLastBillItem = () => {
	form.value.orderList.pop()
}

const formRef = ref<FormInstance>()
const { rules, orderListRules } = useEditFormValidation(form)

const onServiceChange = () => {
	form.value.total = roundToHundredth(form.value.summary + form.value.service)
	form.value.paid = roundToHundredth(form.value.total + form.value.tips)
}
const onSummeryChange = () => {
	form.value.service = roundToHundredth(form.value.total - form.value.summary)
}
const onTipsChange = () => {
	form.value.paid = roundToHundredth(form.value.total + form.value.tips)
}
const onPaidChange = () => {
	form.value.tips = roundToHundredth(form.value.paid - form.value.total)
}
const sumsOfOrderList = computed(() =>
	form.value?.orderList?.reduce((acc, item) => acc + item.sum, 0)
)
watch(
	sumsOfOrderList,
	(value) => {
		form.value.summary = value
		form.value.total = roundToHundredth(form.value.summary + form.value.service)
		form.value.paid = roundToHundredth(form.value.total + form.value.tips)
	},
	{ immediate: true }
)

const isEditMode = computed(() => !!form.value.id)

const onSave = async () => {
	try {
		await useOnValidate(formRef.value, 'Ошибка заполнения формы')
		emit('on-save')
		ElMessage.success(`Чек успешно ${isEditMode.value ? 'изменен' : 'добавлен'}`)
	} catch (error) {
		ElMessage.error((error as Error).message)
	}
}

const onClear = () => {
	formRef.value?.resetFields()

	form.value = props.initialBill
	form.value.orderList = [initialBillItem]
	formRef.value?.clearValidate()
}
</script>

<style lang="scss" scoped>
.add-form {
	display: grid;
	gap: 1rem;

	& > * {
		margin-block: 0;
	}

	&__items {
		display: grid;
		gap: 1rem;
	}

	&__line {
		display: flex;
		gap: 20px;
	}

	&__line-item {
		&--fit {
			flex-grow: 1;
		}
	}

	&__field {
		margin-block: 0;
	}

	&__divider {
		margin-block: 12px 8px;
	}

	&__buttons {
		display: grid;

		&:has(> *:nth-child(2)) {
			grid-template-columns: 1fr 1fr;
			gap: 0.5rem;
			width: 100%;

			&::before,
			&::after {
				display: none;
			}
		}
	}
}
</style>
