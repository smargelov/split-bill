<template>
	<l-page :title="pageTitle">
		<div class="bill-list">
			<bill-list-card
				v-for="bill in bills"
				:key="bill.id"
				:bill="bill"
				@delete-bill="removeBill"
			/>
		</div>
	</l-page>
</template>

<script setup lang="ts">
import { useBillsStore } from '@/composables/useBillsStore.ts'

const pageTitle = 'Чеки'

const { bills, removeBill } = useBillsStore()
</script>

<style lang="scss" scoped>
.bill-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1rem;
}
</style>
