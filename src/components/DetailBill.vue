<template>
	<div class="detail-bill">
		<div class="detail-bill__header">
			<p>
				<el-text type="info">Дата и время:</el-text>
				 
				<el-tag type="success">{{ day }}, {{ date }} в {{ time }}</el-tag>
			</p>
			<p>
				<el-text type="info">Название заведения:</el-text>
				{{ bill.place }}
			</p>
			<p>
				<el-text type="info">Участники:</el-text>
				 
				<el-tag v-for="person in bill.persons" :key="person" type="primary">
					{{ person }}
				</el-tag>
			</p>
		</div>
		<el-scrollbar>
			<el-table :data="bill.orderList" class="detail-bill__table" table-layout="auto">
				<el-table-column
					prop="ruName"
					label="Наименование"
					class-name="detail-bill__table-title"
					fixed
				>
					<template #default="{ row }">
						{{ row.ruName || row.originalName }}
						<el-tooltip
							v-if="row.ruName && row.originalName"
							:content="row.originalName"
							class="item"
							effect="dark"
						>
							<el-icon>
								<info-filled />
							</el-icon>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="quantity" label="Кол-во" />
				<el-table-column prop="price" label="Цена" />
				<el-table-column prop="sum" label="Сумма" />
				<el-table-column prop="members" label="Кто">
					<template #default="{ row }">
						<el-tag v-for="member in row.members" :key="member" type="primary">
							{{ member }}
						</el-tag>
					</template>
				</el-table-column>
			</el-table>
		</el-scrollbar>
		<div class="detail-bill__footer">
			<div class="detail-bill__footer-line">
				<p class="detail-bill__footer-item">
					<el-text type="info">Сумма:</el-text>
					<span>
						{{ bill.summary }}
						<el-text type="info"> {{ bill.currency }}</el-text>
					</span>
				</p>
				<p class="detail-bill__footer-item">
					<el-text type="info">Сервис:</el-text>
					<span>
						{{ bill.service }}
						<el-text type="info"> {{ bill.currency }}</el-text>
					</span>
				</p>
				<p class="detail-bill__footer-item">
					<el-text type="info">Итого:</el-text>
					<span>
						{{ bill.total }}
						<el-text type="info"> {{ bill.currency }}</el-text>
					</span>
				</p>
			</div>
			<div class="detail-bill__footer-line detail-bill__footer-line--two">
				<p class="detail-bill__footer-item">
					<el-text type="info">Чаевые:</el-text>
					<span>
						{{ bill.tips }}
						<el-text type="info"> {{ bill.currency }}</el-text>
					</span>
				</p>
				<p class="detail-bill__footer-item">
					<el-text type="info">Оплатили:</el-text>
					<span>
						{{ bill.paid }}
						<el-text type="info"> {{ bill.currency }}</el-text>
					</span>
				</p>
			</div>
		</div>
		<el-button :icon="Edit" type="primary" @click="goToEditMode">Редактировать</el-button>
	</div>
</template>

<script setup lang="ts">
import type { IBill } from '@/types/bill.ts'
import { useBillDetail } from '@/composables/useBillDetail.ts'
import { InfoFilled, Edit } from '@element-plus/icons-vue'

const props = defineProps<{
	bill: IBill
}>()

const emit = defineEmits<{
	(e: 'go-to-edit-mode'): void
}>()
const goToEditMode = () => {
	emit('go-to-edit-mode')
}

const { date, day, time } = useBillDetail(props.bill)
</script>

<style lang="scss" scoped>
.detail-bill {
	display: grid;
	gap: 2rem;

	&__header {
		display: grid;
		gap: 1rem;
	}

	&__footer {
		display: grid;
		gap: 1rem;
	}

	&__footer-line {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;

		&--two {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	&__footer-item {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 1rem;
		border: 1px solid var(--el-color-info-light-7);
	}
}
</style>
