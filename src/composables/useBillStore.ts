import type { IBill } from '@/types/bill.ts'
import { useBillsStore } from '@/composables/useBillsStore.ts'
import type { ComputedRef } from 'vue'

interface IBillStoreReturn {
	bill: ComputedRef<IBill | undefined>
	updateBill: (bill: IBill) => void
}

export const useBillStore = (id: string): IBillStoreReturn => {
	const { bills, updateBill: update } = useBillsStore()

	const bill = computed(() => bills.value.find((bill) => bill.id === id))

	const updateBill = (bill: IBill): void => {
		update(bill)
	}

	return { bill, updateBill }
}
