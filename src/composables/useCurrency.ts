import type { ComputedRef } from 'vue'

interface IUseCurrencyReturn {
	currencies: ComputedRef<string[]>
	addCurrency: (currency: string) => void
	removeCurrency: (currency: string) => void
}

export const useCurrency = (): IUseCurrencyReturn => {
	const storageCurrencies = useStorage<string[]>('currencies', [])

	const addCurrency = (currency: string): void => {
		storageCurrencies.value = [...new Set([...storageCurrencies.value, currency.toUpperCase()])]
	}

	const currencies = computed(() => storageCurrencies.value)

	const removeCurrency = (currency: string): void => {
		storageCurrencies.value = storageCurrencies.value.filter((c) => c !== currency)
	}

	return { addCurrency, removeCurrency, currencies }
}
