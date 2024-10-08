import type { IBillItem } from '@/types/bill.ts'

export const useInitialBillItem = (): { initialBillItem: IBillItem } => {
	const initialBillItem: IBillItem = {
		id: '',
		name: '',
		quantity: 1,
		price: 0,
		sum: 0,
		members: [],
	}

	return { initialBillItem }
}
