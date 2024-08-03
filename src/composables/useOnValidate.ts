import type { FormInstance } from 'element-plus'

export const useOnValidate = async (
	formElement?: FormInstance,
	message = 'Форма заполнена некорректно'
) => {
	const validationError = new Error('Validation error')
	if (!formElement) {
		validationError.name = 'FormInstanceError'
		validationError.message = 'FormInstance is not defined'
		throw validationError
	}
	await formElement.validate((valid) => {
		if (!valid) {
			validationError.name = 'ValidationError'
			validationError.message = message
			throw validationError
		}
	})
}
