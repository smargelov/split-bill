<template>
	<div class="members-score">
		<el-collapse>
			<el-collapse-item v-for="member in membersScore" :key="member.name">
				<template #title>
					<div class="members-score__title">
						<el-tag type="primary" size="large">{{ member.name }}</el-tag>
						<div class="members-score__title-price">
							<el-tag type="warning" size="large">{{ member.paid }}</el-tag>
							<el-tag type="info">{{ bill.currency }}</el-tag>
						</div>
					</div>
				</template>
				<div class="members-score__items">
					<members-checkbox-item
						v-for="(item, index) in bill.orderList"
						:key="index"
						:item="item"
						:member="member"
						:currency="bill.currency"
						@change="toggleItemMember(member.name, item)"
					/>
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script setup lang="ts">
import type { IBill, IBillItem } from '@/types/bill.ts'
import { useMembersScore } from '@/composables/useMembersScore.ts'
import MembersCheckboxItem from '@/components/MembersCheckboxItem.vue'

const bill = defineModel<IBill>('bill', { required: true })

const { membersScore } = useMembersScore(bill.value)

const toggleItemMember = (member: string, item: IBillItem) => {
	item.members = item.members.includes(member)
		? item.members.filter((name) => name !== member)
		: [...item.members, member]
}
</script>

<style lang="scss" scoped>
.members-score {
	display: grid;

	&__title {
		display: flex;
		flex-grow: 1;
		gap: 2rem;
		align-items: center;
		justify-content: space-between;
	}

	&__title-price {
		display: flex;
		gap: 0.3rem;
		align-items: center;
	}

	&__items {
		display: grid;
	}
}
</style>
