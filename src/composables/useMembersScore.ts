import type { ComputedRef } from 'vue'
import type { IBill } from '@/types/bill.ts'
import type { IMember } from '@/types/member.ts'
import { roundToHundredth } from '@/utils/filters.ts'

interface IUseMembersScoreReturn {
	membersScore: ComputedRef<IMember[]>
}

export const useMembersScore = (bill: IBill): IUseMembersScoreReturn => {
	const tipsPercent = computed(() => ((bill.paid - bill.summary) * 100) / bill.summary)

	const membersScore = computed(() => {
		return bill.persons.map((person) => {
			const items = bill.orderList
				.filter((orderItem) => orderItem.members.includes(person))
				.map((orderItem) => {
					const membersCount = orderItem.members.length
					const memberMoneyPart = orderItem.sum / membersCount

					return {
						memberMoneyPart: memberMoneyPart,
					}
				})

			const sum = roundToHundredth(
				items.reduce((total, item) => total + item.memberMoneyPart, 0)
			)
			const paid = roundToHundredth(sum * (1 + tipsPercent.value / 100))

			return {
				name: person,
				paid: paid,
			}
		})
	})

	return { membersScore }
}
