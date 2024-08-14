export interface IOrder {
	originalName: string
	ruName: string
	quantity: number
	price: number
	sum: number
	memberPart: number
	memberMoneyPart: number
}

export interface IMember {
	name: string
	paid: number
}
