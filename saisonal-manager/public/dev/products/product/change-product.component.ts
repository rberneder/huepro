import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {Month} from "../../util/month";
import {MONTHS} from "../../util/month.seed";

@Component({
	selector: "change-product",
	templateUrl: '/templates/products/change-product.template.html',
	providers: [ProductService]
})
export class ChangeProductComponent implements OnInit {

	products:Product[];
	months:Month[];
	editNr = -1;


	constructor (private _productService: ProductService) {
		this.months = MONTHS;
	}

	delete(product) {
		this._productService
			.deleteProduct(product._id)
			.subscribe();

		var index = this.products.indexOf(product);
		this.products.splice(index, 1);
	}

	edit(i) {
		this.editNr = i;
	}

	stopEdit() {
		this.editNr = -1;
	}

	onSubmit(product: Product, value) {
		product.name = value.name;
		product.family = value.family;
		product.category = value.category;
		product.plantStartDay = value.plantStartDay;
		product.plantEndDay = value.plantEndDay;
		product.plantStartMonth = value.plantStartMonth - 1;
		product.plantEndMonth = value.plantEndMonth - 1;
		product.harvestStartDay = value.harvestStartDay;
		product.harvestEndDay = value.harvestEndDay;
		product.harvestStartMonth = value.harvestStartMonth - 1;
		product.harvestEndMonth = value.harvestEndMonth - 1;
		product.storageDays = value.storageDays;
		product.shortDescription = value.shortDescription;
		product.description = value.description;

		this._productService
			.updateProduct(product)
			.subscribe();
	}

	ngOnInit() {
		this._productService
			.getProducts()
			.subscribe(products => this.products = products);
	}
}