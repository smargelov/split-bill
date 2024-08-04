import type { IBill } from '@/types/bill.ts'

interface IUseBillDetailReturn {
	persons: ComputedRef<string>
	date: ComputedRef<string>
	day: ComputedRef<string>
	time: ComputedRef<string>
}

export const useBillDetail = (bill: IBill): IUseBillDetailReturn => {
	const persons = computed(() => bill.persons.join(', '))
	const date = useDateFormat(bill.date, 'DD.MM.YYYY')
	const day = useDateFormat(bill.date, 'dddd', { locales: 'ru' })
	const time = useDateFormat(bill.date, 'HH:mm')

	return { persons, date, day, time }
}
