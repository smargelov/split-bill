<template>
	<div class="json-bill-form">
		<el-form-item>
			<el-input
				v-model="jsonText"
				:autosize="{ minRows: 5, maxRows: 15 }"
				class="json-bill-form__json-textarea"
				type="textarea"
				placeholder="Вставить json"
			/>
		</el-form-item>
		<el-button-group class="json-bill-form__buttons">
			<el-button :icon="Delete" size="large" @click="onClear">Очистить</el-button>
			<el-button
				v-if="isCopySupported && jsonText"
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
	</div>
</template>

<script setup lang="ts">
import type { IBill } from '@/types/bill.ts'
import { Delete, CopyDocument, SuccessFilled } from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'

const props = defineProps<{
	isJsonTabActive: boolean
}>()

const form = defineModel<IBill>('form')

const jsonText = ref('')

watchEffect(() => {
	if (props.isJsonTabActive) {
		jsonText.value = JSON.stringify(form.value, null, 2)
	}
})

const onClear = () => (jsonText.value = '')

const { copy, isSupported: isCopySupported } = useClipboard({ source: jsonText })
const onCopy = async () => {
	try {
		await copy(jsonText.value)
		ElMessage.success('JSON скопирован в буфер обмена')
	} catch (err) {
		ElMessage.error(`Что-то пошло не так. Ошибка ${err}`)
	}
}

const checkBillItem = (item: any): boolean => {
	const { originalName, ruName, quantity, price, sum, members } = item

	if ('originalName' in item && typeof originalName !== 'string') {
		return false
	}
	if ('ruName' in item && typeof ruName !== 'string') {
		return false
	}
	if (
		'members' in item &&
		(!Array.isArray(members) || members.some((e) => typeof e !== 'string'))
	) {
		return false
	}
	return typeof quantity === 'number' && typeof price === 'number' && typeof sum === 'number'
}

const checkBillObject = (candidate: any): boolean => {
	if (typeof candidate !== 'object') {
		return false
	}

	const { date, place, persons, orderList, currency, summary, service, total, tips, paid } =
		candidate

	if (
		'persons' in candidate &&
		(!Array.isArray(persons) || persons.some((e) => typeof e !== 'string'))
	) {
		return false
	}

	if ('tips' in candidate && typeof tips !== 'number') {
		return false
	}

	if ('paid' in candidate && typeof paid !== 'number') {
		return false
	}

	if (!Array.isArray(orderList) || orderList.some((item) => !checkBillItem(item))) {
		return false
	}

	return (
		typeof date === 'string' &&
		typeof place === 'string' &&
		typeof currency === 'string' &&
		typeof summary === 'number' &&
		typeof service === 'number' &&
		typeof total === 'number'
	)
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
	obj: Record<string, any>,
	allowedFields: string[]
): Record<string, any> => {
	return Object.keys(obj)
		.filter((key) => allowedFields.includes(key))
		.reduce(
			(filteredObj, key) => {
				filteredObj[key] = obj[key]
				return filteredObj
			},
			{} as Record<string, any>
		)
}
const onSave = async () => {
	try {
		const candidate = await JSON.parse(jsonText.value)
		const isValid = checkBillObject(candidate)
		if (!isValid) {
			throw new Error()
		}
		const formatedOrderList = candidate.orderList.map((item) =>
			filterObjectFields(item, orderListAllowedFields)
		)
		const formatedBill = {
			...filterObjectFields(candidate, billAllowedFields),
			formatedOrderList,
		}
		form.value = { ...form.value, ...formatedBill } as IBill
		ElMessage.success('JSON сохранён')
	} catch (err) {
		console.log(err)
		ElMessage.error('Неверный формат JSON')
	}
}
</script>

<style lang="scss">
.json-bill-form {
	display: grid;

	&__buttons {
		justify-self: end;
	}
}
</style>
