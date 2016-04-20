export interface Product {
	_id: number,
	name: string,
	family_id: string,
	plantStart: {
		month: number,
		day: number
	},
	plantDays: number,
	harvestStart: {
		month: number,
		day: number
	},
	harvestDays: number,
	storageDays: number,
	shortDescription: string,
	description: string
}