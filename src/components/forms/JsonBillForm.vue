<template>
	<el-form ref="formRef" :model="jsonForm" :rules="rules" class="json-bill-form">
		<el-form-item prop="jsonText">
			<el-input
				v-model="jsonForm.jsonText"
				:autosize="{ minRows: 5, maxRows: 15 }"
				class="json-bill-form__json-textarea"
				type="textarea"
				placeholder="Вставить json"
			/>
		</el-form-item>
		<el-button-group class="json-bill-form__buttons">
			<el-button :icon="Delete" size="large" @click="onClear">Очистить</el-button>
			<el-button
				v-if="isCopySupported && jsonForm.jsonText"
				:icon="CopyDocument"
				size="large"
				@click="onCopy"
			>
				Копировать
			</el-button>
			<el-button :icon="SuccessFilled" type="success" size="large" @click="onSave">
				Сохранить
			</el-button>
		</el-button-group>
	</el-form>
</template>

<script setup lang="ts">
import type { IBill, IBillItem, IJsonBill } from '@/types/bill.ts'
import { Delete, CopyDocument, SuccessFilled } from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css'
import { ElMessage, type FormInstance } from 'element-plus'
import { useJsonFormValidation } from '@/composables/useJsonFormValidation.ts'
import { useOnValidate } from '@/composables/useOnValidate.ts'

const form = defineModel<IBill>('form')

const props = defineProps<{
	isJsonTabActive: boolean
}>()

const emit = defineEmits<{
	(e: 'on-save'): void
}>()

const formRef = ref<FormInstance>()

const jsonForm = ref<IJsonBill>({
	jsonText: '',
})

const { rules } = useJsonFormValidation(jsonForm, formRef.value)

watchEffect(() => {
	if (props.isJsonTabActive) {
		jsonForm.value.jsonText = JSON.stringify(form.value, null, 2)
	}
})

const onClear = () => (jsonForm.value.jsonText = '')

const { copy, isSupported: isCopySupported } = useClipboard({ source: jsonForm.value.jsonText })
const onCopy = async () => {
	try {
		await copy(jsonForm.value.jsonText)
		ElMessage.success('JSON скопирован в буфер обмена')
	} catch (err) {
		ElMessage.error(`Что-то пошло не так. Ошибка ${err}`)
	}
}

const billAllowedFields = [
	'date',
	'place',
	'persons',
	'currency',
	'summary',
	'service',
	'total',
	'tips',
	'paid',
]
const orderListAllowedFields = ['originalName', 'ruName', 'quantity', 'price', 'sum', 'members']

const filterObjectFields = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	obj: Record<string, any>,
	allowedFields: string[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> => {
	return Object.keys(obj)
		.filter((key) => allowedFields.includes(key))
		.reduce(
			(filteredObj, key) => {
				filteredObj[key] = obj[key]
				return filteredObj
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			{} as Record<string, any>
		)
}
const onSave = async () => {
	try {
		await useOnValidate(formRef.value, 'Неверный формат JSON')
		const candidate = await JSON.parse(jsonForm.value.jsonText)
		const orderList = candidate.orderList.map((item: IBillItem) =>
			filterObjectFields(item, orderListAllowedFields)
		)
		const formatedBill = {
			...filterObjectFields(candidate, billAllowedFields),
			orderList,
		}
		form.value = { ...form.value, ...formatedBill } as IBill
		emit('on-save')
		ElMessage.success('JSON сохранён')
	} catch (error) {
		ElMessage.error((error as Error).message)
	}
}
</script>

<style lang="scss" scoped>
.json-bill-form {
	display: grid;

	&__json-textarea {
		width: 100%;
		min-height: 20rem;
	}

	&__buttons {
		justify-self: end;
	}
}
</style>
