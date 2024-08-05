<template>
	<div class="members-score">
		<el-divider content-position="left">Участники</el-divider>
		<el-scrollbar>
			<el-table :data="membersScore" class="members-score__table" table-layout="auto">
				<el-table-column type="expand" fixed>
					<template #default="{ row }">
						<div class="members-score__expand">
							<div v-for="item in row.items" :key="item" class="members-score__item">
								<p>
									<el-tag type="success"
										>{{ item.ruName || item.originalName }}
									</el-tag>
									<el-tooltip
										v-if="item.ruName && item.originalName"
										:content="item.originalName"
										class="item"
										effect="dark"
									>
										<el-icon>
											<info-filled />
										</el-icon>
									</el-tooltip>
								</p>
								<p>
									{{ item.memberPart }}
									<el-text type="info">x</el-text>
									{{ item.price }}
									<el-text type="info">=</el-text>
									{{ item.memberMoneyPart }}
								</p>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="Имя" fixed />
				<el-table-column prop="paid" label="Итого" />
			</el-table>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import type { IBill } from '@/types/bill.ts'
import { InfoFilled } from '@element-plus/icons-vue'
import { useMembersScore } from '@/composables/useMembersScore.ts'

const props = defineProps<{
	bill: IBill
}>()

const { membersScore } = useMembersScore(props.bill)
</script>

<style lang="scss" scoped>
.members-score {
	display: grid;

	&__expand {
		display: grid;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
	}

	&__item {
		display: grid;
		grid-template-columns: max-content auto;
		gap: 2rem;
	}
}
</style>
