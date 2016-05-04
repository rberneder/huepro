import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {ProductService} from "./product.service";
import {Product} from "./product";

@Component({
	selector: "products",
	templateUrl: '/templates/products/new-product.template.html',
	providers: [ProductService],
	directives: [ROUTER_DIRECTIVES]

})
export class ProductsComponent implements OnInit {

	public products: Product[];
	public editing = false;

	constructor(private _productService: ProductService) {}



	onEdit() {
		this.editing = true;
	}

	ngOnInit():any {
		this._productService.getProducts()
			.subscribe(
				data => { this.products = data },
				err => console.error(err)
			);
	}
}
