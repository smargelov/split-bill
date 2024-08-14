import type { FormRules } from 'element-plus'
import type { IJsonBill } from '@/types/bill.ts'
import { useCustomValidators } from '@/composables/useCustomValidators.ts'

interface IUseJsonFormValidationReturn {
	rules: FormRules<IJsonBill>
}

export const useJsonFormValidation = (form: Ref<IJsonBill>): IUseJsonFormValidationReturn => {
	const { validateJsonText } = useCustomValidators<IJsonBill>(form)

	const rules = reactive<FormRules<IJsonBill>>({
		jsonText: [
			{ required: true, message: 'Обязательное поле', trigger: ['blur'] },
			{ validator: validateJsonText, trigger: ['blur'] },
		],
	})

	return { rules }
}
