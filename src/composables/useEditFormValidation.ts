import type { FormRules } from 'element-plus'
import type { IBill, IBillItem } from '@/types/bill.ts'
import { useCustomValidators } from '@/composables/useCustomValidators.ts'

interface IUseEditFormValidationReturn {
	rules: FormRules<IBill>
	orderListRules: FormRules<IBillItem>
}

export const useEditFormValidation = (form: Ref<IBill>): IUseEditFormValidationReturn => {
	const { validateTotal, validateItemSum, validatePaid } = useCustomValidators<IBill>(form)

	const rules = reactive<FormRules<IBill>>({
		date: [{ required: true, message: 'Обязательное поле', trigger: ['blur'] }],
		currency: [{ required: true, message: 'Обязательное поле', trigger: ['blur'] }],
		place: [{ required: true, message: 'Обязательное поле', trigger: ['blur'] }],
		persons: [
			{
				type: 'array',
				required: true,
				message: 'Обязательное поле',
				trigger: ['change'],
			},
		],
		total: [{ validator: validateTotal, trigger: ['blur'] }],
		tips: [{ type: 'number', min: 0, message: 'Меньше 0', trigger: ['blur'] }],
		paid: [{ validator: validatePaid, trigger: ['blur'] }],
	})

	const orderListRules = reactive<FormRules<IBillItem>>({
		name: [{ required: true, message: 'Обязательное поле', trigger: ['blur'] }],
		quantity: [
			{ required: true, message: 'Обязательное поле', trigger: ['blur'] },
			{ type: 'number', min: 1, message: 'Меньше 1', trigger: ['blur'] },
		],
		price: [{ required: true, message: 'Обязательное поле', trigger: ['blur'] }],
		sum: [{ validator: validateItemSum, trigger: ['change'] }],
	})

	return { rules, orderListRules }
}
