export interface Recipe {
	_id: number,
	image: string,
	name: string,
	ingredients: string,
	description: string,
	productFamilies: string[],
	products: string[]
}