import type { IBill } from '@/types/bill.ts'
import type { RemovableRef } from '@vueuse/core'

interface IBillsStoreReturn {
	bills: RemovableRef<IBill[]>
	addBill: (bill: IBill) => void
	removeBill: (id: IBill['id']) => void
	getBill: (id: IBill['id']) => IBill | undefined
}

export const useBillsStore = (): IBillsStoreReturn => {
	const storageBills = useStorage<IBill[]>('bills', [])

	const getUniqId = (): string => {
		return new Date().getTime().toString()
	}
	const addBill = (bill: IBill): void => {
		bill.id = getUniqId()
		storageBills.value = [...storageBills.value, bill]
	}

	const removeBill = (id: IBill['id']): void => {
		storageBills.value = storageBills.value.filter((bill) => bill.id !== id)
	}

	const getBill = (id: IBill['id']): IBill | undefined =>
		storageBills.value.find((bill) => bill.id === id)

	return { bills: storageBills, addBill, removeBill, getBill }
}
