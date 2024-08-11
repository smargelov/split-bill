<template>
	<div class="drawer-content">
		<article class="drawer-content__item">
			<h3 class="drawer-content__title">Тема приложения</h3>
			<theme-switcher />
		</article>
		<article class="drawer-content__item">
			<h3 class="drawer-content__title">Участники</h3>
			<el-empty v-if="!persons.length" description="Добавьте участника" />
			<ul v-else class="drawer-content__list">
				<li v-for="person in persons" :key="person" class="drawer-content__list-item">
					<p>{{ person }}</p>
					<el-button
						:icon="Delete"
						type="danger"
						area-label="Удалить участника"
						text
						bg
						@click="removePerson(person)"
					/>
				</li>
			</ul>
			<div class="drawer-content__add-line">
				<el-input v-model="newPerson" placeholder="Добавить нового участника" />
				<el-button
					:icon="CirclePlus"
					:disabled="!isValidPerson"
					type="success"
					aria-label="Добавить участника"
					@click="addNewPerson"
				/>
			</div>
		</article>
		<article class="drawer-content__item">
			<h3 class="drawer-content__title">Валюты</h3>
			<el-empty v-if="!currencies.length" description="Добавьте валюту" />
			<ul v-else class="drawer-content__list">
				<li
					v-for="currency in currencies"
					:key="currency"
					class="drawer-content__list-item"
				>
					<p>{{ currency }}</p>
					<el-button
						:icon="Delete"
						type="danger"
						area-label="Удалить валюту"
						text
						bg
						@click="removeCurrency(currency)"
					/>
				</li>
			</ul>
			<div class="drawer-content__add-line">
				<el-input v-model="newCurrency" placeholder="Добавить новую валюту" />
				<el-button
					:icon="CirclePlus"
					:disabled="!isValidCurrency"
					type="success"
					aria-label="Добавить валюту"
					@click="addNewCurrency"
				/>
			</div>
		</article>
	</div>
</template>

<script setup lang="ts">
import { usePerson } from '@/composables/usePerson.ts'
import { Delete, CirclePlus } from '@element-plus/icons-vue'
import { useCurrency } from '@/composables/useCurrency.ts'

const { addPerson, removePerson, persons } = usePerson()
const newPerson = ref('')
const isValidPerson = computed(() => newPerson.value.trim().length >= 2)
const addNewPerson = () => {
	addPerson(newPerson.value)
	newPerson.value = ''
}

const { addCurrency, removeCurrency, currencies } = useCurrency()
const newCurrency = ref('')
const isValidCurrency = computed(() => newCurrency.value.trim().length >= 2)
const addNewCurrency = () => {
	addCurrency(newCurrency.value)
	newCurrency.value = ''
}
</script>

<style lang="scss" scoped>
.drawer-content {
	display: grid;
	gap: 2rem;

	&__item {
		display: grid;
		gap: 1.5rem;
	}

	&__list {
		display: grid;
		gap: 0.5rem;
	}

	&__list-item {
		display: flex;
		gap: 1rem;

		& > *:first-child {
			margin-right: auto;
		}
	}

	&__add-line {
		display: grid;
		grid-template-columns: 1fr min-content;
	}
}
</style>
