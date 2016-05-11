import {Component, OnInit} from "angular2/core";
import {ProductService} from "./product.service";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {Product} from "./product";
import {MONTHS} from "../util/month.seed";
import {Month} from "../util/month";

@Component({
	selector: "change-product",
	templateUrl: '/templates/products/change-product.template.html',
	providers: [ProductService]
})
export class ChangeProductComponent implements OnInit {

	products:Product[];
	months:Month[];

	constructor (private _productService: ProductService) {
		this.months = MONTHS;
	}

	delete(product) {
		this._productService
			.deleteProduct(product._id)
			.subscribe()
		console.log(this.products);

		var index = this.products.indexOf(product);
		this.products.splice(index, 1);

	}

	ngOnInit() {
		this._productService
			.getProducts()
			.subscribe(products => this.products = products);
	}
}