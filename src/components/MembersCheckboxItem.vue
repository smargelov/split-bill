<template>
	<el-checkbox
		:label="item.ruName"
		:value="item.ruName"
		:model-value="isChecked"
		size="large"
		class="member-checkbox-item"
		@change="onChange"
	>
		<div class="member-checkbox-item__content">
			<p class="member-checkbox-item__title">{{ item.ruName || item.originalName }}</p>
			<p class="member-checkbox-item__price">
				<el-text v-if="isChecked" type="info" class="member-checkbox-item__price-text">
					{{ partText }}
				</el-text>
				<el-text
					:type="isChecked ? 'warning' : 'info'"
					class="member-checkbox-item__price-text"
				>
					{{ priceText }}
				</el-text>
				<el-text type="info" size="small" class="member-checkbox-item__price-text">
					{{ currency }}
				</el-text>
			</p>
		</div>
	</el-checkbox>
</template>

<script setup lang="ts">
import type { IBillItem } from '@/types/bill.ts'
import type { IMember } from '@/types/member.ts'
import { roundToHundredth } from '@/utils/filters.ts'

const props = defineProps<{
	item: IBillItem
	member: IMember
	currency: string
}>()

const emit = defineEmits<{
	(e: 'change', member: string, item: IBillItem): void
}>()

const isChecked = computed(() => props.item.members.includes(props.member.name))

const countOfMembers = computed(() => props.item.members.length)

const priceText = computed(() => {
	const { price, quantity, sum } = props.item
	return isChecked.value
		? `${roundToHundredth(sum / countOfMembers.value)} из ${sum}`
		: `${quantity} × ${price} = ${sum}`
})

const partText = computed(() => {
	const { quantity } = props.item
	return `(${roundToHundredth(quantity / countOfMembers.value)}/${quantity})`
})

const onChange = () => {
	emit('change', props.member.name, props.item)
}
</script>

<style lang="scss" scoped>
.member-checkbox-item {
	display: grid;
	grid-template-columns: min-content 1fr;
	margin-right: 0;
	white-space: normal;

	&__title {
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.3;
		text-wrap: balance;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
	}

	&__content {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
	}

	&__price {
		display: flex;
		gap: 0.2rem;
		align-items: center;
	}

	&__price-text {
		white-space: nowrap;
	}
}
</style>
