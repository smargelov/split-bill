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
				<el-text size="large" type="warning">{{ bill.paid }}</el-text>
				<el-text type="info">  {{ bill.currency }}</el-text>
			</p>
		</template>
		<template #footer>
			<div class="bill-list-card__footer">
				<router-link :to="`/bills/${bill.id}`" class="bill-list-card__link">
					Подробнее...
				</router-link>
				<el-popconfirm
					title="Это действие нельзя отменить. Продолжить?"
					confirm-button-text="Да"
					cancel-button-text="Нет"
					@confirm="deleteBill"
				>
					<template #reference>
						<el-button :icon="Delete" type="danger" circle />
					</template>
				</el-popconfirm>
			</div>
		</template>
	</el-card>
</template>

<script setup lang="ts">
import type { IBill } from '@/types/bill.ts'
import { useBillDetail } from '@/composables/useBillDetail.ts'
import { Delete } from '@element-plus/icons-vue'

const props = defineProps<{
	bill: IBill
}>()

const emit = defineEmits<{
	(e: 'delete-bill', id: string): void
}>()

const deleteBill = () => props.bill.id && emit('delete-bill', props.bill.id)

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

	&__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
