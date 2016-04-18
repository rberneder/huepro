export interface Product {
	_id: number,
	name: string,
	family_id: string,
	plantStart: string,
	plantDays: number,
	harvestStart: string,
	harvestDays: number,
	storageDays: number,
	shortDescription: string,
	description: string
}