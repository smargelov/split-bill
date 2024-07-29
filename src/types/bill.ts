export interface IBillItem {
	originalName: string
	ruName: string
	quantity: number
	price: number
	sum: number
}

export interface IBill {
	id: string
	date: string
	place: string
	persons: string[]
	orderList: IBillItem[]
	currency: string
	summary: number
	service: number
	total: number
	tips: number
	paid: number
}
