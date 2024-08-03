import type { FormInstance } from 'element-plus'
import type { InternalRuleItem, SyncValidateResult } from 'async-validator'
import type { Ref } from 'vue'
import type { IBill, IBillItem } from '@/types/bill.ts'

interface IUseCustomValidatorsReturn {
	validateTotal: (
		_: InternalRuleItem,
		value: number,
		callback: (error?: string | Error) => void
	) => void | SyncValidateResult
	validatePaid: (
		_: InternalRuleItem,
		value: number,
		callback: (error?: string | Error) => void
	) => void | SyncValidateResult
	validateItemName: (
		rule: InternalRuleItem,
		_: string,
		callback: (error?: string | Error) => void
	) => void | SyncValidateResult
	validateItemSum: (
		rule: InternalRuleItem,
		value: number,
		callback: (error?: string | Error) => void
	) => void | SyncValidateResult
	validateJsonText: (
		_: InternalRuleItem,
		value: string,
		callback: (error?: string | Error) => void
	) => void | SyncValidateResult
}

export const useCustomValidators = <T>(
	form: Ref<T>,
	formRef?: FormInstance
): IUseCustomValidatorsReturn => {
	const validateTotal = (
		_: InternalRuleItem,
		value: number,
		callback: (error?: string | Error) => void
	): void | SyncValidateResult => {
		if (value !== (form.value as IBill).summary + (form.value as IBill).service) {
			callback(new Error('Итого должно быть равно сумме и сервису'))
		} else {
			callback()
		}
	}

	const validatePaid = (
		_: InternalRuleItem,
		value: number,
		callback: (error?: string | Error) => void
	): void | SyncValidateResult => {
		if (value !== (form.value as IBill).total + (form.value as IBill).tips) {
			callback(new Error('Итого + чаевые'))
		} else {
			callback()
		}
	}

	const getCurrentItemIndex = (rule: InternalRuleItem): Nullable<number> =>
		rule.field?.split('.')[1] ? parseInt(rule.field?.split('.')[1]) : null

	const getCurrentItem = (index: Nullable<number>): IBillItem => {
		if (index === null) {
			return {} as IBillItem
		}
		return (form.value as IBill).orderList[index]
	}

	const validateItemName = (
		rule: InternalRuleItem,
		_: string,
		callback: (error?: string | Error) => void
	): void | SyncValidateResult => {
		const index = getCurrentItemIndex(rule)
		const { ruName, originalName } = getCurrentItem(index)
		if (!originalName && !ruName) {
			callback(new Error('Заполните одно из названий'))
		} else {
			if ((originalName || ruName) && formRef) {
				formRef.clearValidate(`orderList.${index}.originalName`)
				formRef.clearValidate(`orderList.${index}.ruName`)
			}
			callback()
		}
	}

	const validateItemSum = (
		rule: InternalRuleItem,
		value: number,
		callback: (error?: string | Error) => void
	): void | SyncValidateResult => {
		const index = getCurrentItemIndex(rule)
		const { quantity, price } = getCurrentItem(index)
		if (quantity * price !== value) {
			callback(new Error('количество * цена'))
		} else {
			callback()
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	const getCandidate = (value: string): IBill | Error => {
		try {
			return JSON.parse(value)
		} catch (_) {
			throw new Error('Некорректный JSON')
		}
	}

	const validateJsonText = (
		_: InternalRuleItem,
		value: string,
		callback: (error?: string | Error) => void
	): void | SyncValidateResult => {
		try {
			const candidate = getCandidate(value)
			if (!checkBillObject(candidate)) {
				throw new Error('Невалидный JSON')
			}
			callback()
		} catch (error) {
			callback(new Error((error as Error).message))
		}
	}

	return {
		validateTotal,
		validatePaid,
		validateItemName,
		validateItemSum,
		validateJsonText,
	}
}
