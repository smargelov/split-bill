import type { IBillItem } from '@/types/bill.ts'

export const useInitialBillItem = (): { initialBillItem: IBillItem } => {
	const initialBillItem: IBillItem = {
		id: '',
		originalName: '',
		ruName: '',
		quantity: 0,
		price: 0,
		sum: 0,
		members: [],
	}

	return { initialBillItem }
}
