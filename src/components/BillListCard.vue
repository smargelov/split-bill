<template>
	<el-card class="bill-list-card">
		<template #header>
			<div class="bill-list-card__header">
				<el-tag type="success">{{ day }}, {{ date }} в {{ time }}</el-tag>
				{{ bill.place }}
			</div>
		</template>
		<template #default>
			<p>
				Участники:
				<el-text size="large" type="warning">{{ persons }}</el-text>
			</p>
			<p>
				Сумма:
				<el-text size="large" type="warning">{{ bill.total }}</el-text>
				<el-text type="info">  {{ bill.currency }}</el-text>
			</p>
		</template>
		<template #footer>
			<router-link :to="`/bills/${bill.id}`" class="bill-list-card__link">
				Подробнее...
			</router-link>
		</template>
	</el-card>
</template>

<script setup lang="ts">
import type { IBill } from '@/types/bill.ts'
import { useBillDetail } from '@/composables/useBillDetail.ts'

const props = defineProps<{
	bill: IBill
}>()

const { persons, date, day, time } = useBillDetail(props.bill)
</script>

<style lang="scss" scoped>
.bill-list-card {
	&__header {
		display: flex;
		gap: 2rem;
		align-items: center;
		justify-content: space-between;
	}

	&__link {
		color: var(--el-color-primary);
		text-decoration: none;

		&:is(:hover, :focus-visible) {
			text-decoration: underline;
		}
	}
}
</style>
