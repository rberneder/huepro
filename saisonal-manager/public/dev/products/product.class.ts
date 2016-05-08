import {Product} from "./product";
export class ProductCl implements Product {
	_id: number;
	name: string;
	family: string;
	category: string;
	plantStartMonth: number;
	plantStartDay: number;
	plantEndMonth: number;
	plantEndDay: number;
	harvestStartMonth: number;
	harvestStartDay: number;
	harvestEndMonth: number;
	harvestEndDay: number;
	storageDays: number;
	shortDescription: string;
	description: string;
}