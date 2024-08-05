import type { ComputedRef } from 'vue'
import type { IBill, IBillItem } from '@/types/bill.ts'
import type { IMember } from '@/types/member.ts'

interface IUseMembersScoreReturn {
	membersScore: ComputedRef<IMember[]>
	emptyOrderItems: ComputedRef<IBillItem[]>
}

export const useMembersScore = (bill: IBill): IUseMembersScoreReturn => {
	const tipsPercent = computed(() => ((bill.paid - bill.summary) * 100) / bill.summary)

	const membersScore = computed(() => {
		return bill.persons.map((person) => {
			const items = bill.orderList
				.filter((orderItem) => orderItem.members.includes(person))
				.map((orderItem) => {
					const membersCount = orderItem.members.length
					const memberPart = orderItem.quantity / membersCount
					const memberMoneyPart = orderItem.sum / membersCount

					return {
						originalName: orderItem.originalName,
						ruName: orderItem.ruName,
						quantity: orderItem.quantity,
						price: orderItem.price,
						sum: orderItem.sum,
						memberPart: memberPart,
						memberMoneyPart: memberMoneyPart,
					}
				})

			const sum =
				Math.round(items.reduce((total, item) => total + item.memberMoneyPart, 0) * 100) /
				100
			const paid = Math.round(sum * (1 + tipsPercent.value / 100) * 100) / 100

			return {
				name: person,
				items: items,
				sum: sum,
				paid: paid,
			}
		})
	})

	const emptyOrderItems = computed(() =>
		bill.orderList.filter((orderItem) => orderItem.members.length === 0)
	)

	return { membersScore, emptyOrderItems }
}
