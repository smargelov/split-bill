import type { FormInstance, FormRules } from 'element-plus'
import type { IJsonBill } from '@/types/bill.ts'
import { useCustomValidators } from '@/composables/useCustomValidators.ts'

interface IUseJsonFormValidationReturn {
	rules: FormRules<IJsonBill>
}

export const useJsonFormValidation = (
	form: Ref<IJsonBill>,
	formRef?: FormInstance
): IUseJsonFormValidationReturn => {
	const { validateJsonText } = useCustomValidators<IJsonBill>(form, formRef)

	const rules = reactive<FormRules<IJsonBill>>({
		jsonText: [
			{ required: true, message: 'Обязательное поле', trigger: ['blur'] },
			{ validator: validateJsonText, trigger: ['blur'] },
		],
	})

	return { rules }
}
