import type { IBill } from '@/types/bill.ts'
import type { RemovableRef } from '@vueuse/core'

interface IBillsStoreReturn {
	bills: RemovableRef<IBill[]>
	addBill: (bill: IBill) => string
	updateBill: (bill: IBill) => void
	removeBill: (id: IBill['id']) => void
	getBill: (id: IBill['id']) => IBill | undefined
}

export const useBillsStore = (): IBillsStoreReturn => {
	const storageBills = useStorage<IBill[]>('bills', [])

	const getUniqId = (): string => {
		return new Date().getTime().toString()
	}
	const addBill = (bill: IBill): string => {
		bill.id = getUniqId()
		storageBills.value = [...storageBills.value, bill]
		return bill.id
	}

	const removeBill = (id: IBill['id']): void => {
		storageBills.value = storageBills.value.filter((bill) => bill.id !== id)
	}

	const updateBill = (bill: IBill): void => {
		const index = storageBills.value.findIndex((b) => b.id === bill.id)
		if (index !== -1) {
			storageBills.value[index] = bill
		}
	}

	const getBill = (id: IBill['id']): IBill | undefined =>
		storageBills.value.find((bill) => bill.id === id)

	return { bills: storageBills, addBill, updateBill, removeBill, getBill }
}
