import type { WritableComputedRef } from 'vue'

interface IUsePersonReturn {
	persons: WritableComputedRef<string[]>
	addPerson: (person: string) => void
	removePerson: (person: string) => void
}

export const usePerson = (): IUsePersonReturn => {
	const storagePersons = useStorage<string[]>('persons', [])

	const addPerson = (person: string): void => {
		storagePersons.value = [...new Set([...storagePersons.value, person])]
	}

	const persons = computed({
		get: () => storagePersons.value,
		set: (value: string[]) => {
			storagePersons.value = [...new Set([...storagePersons.value, ...value])]
		},
	})

	const removePerson = (person: string): void => {
		persons.value = persons.value.filter((p) => p !== person)
	}

	return { addPerson, removePerson, persons }
}
