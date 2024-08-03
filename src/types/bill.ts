export interface IBillItem {
	id?: string
	originalName: string
	ruName: string
	quantity: number
	price: number
	sum: number
	members: string[]
}

export interface IBill {
	id?: string
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

export interface IJsonBill {
	jsonText: string
}
