import {Component, OnInit} from "angular2/core";
import {ProductService} from "./product.service";
import {Product} from "./product";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
	selector: "products",
	templateUrl: '/templates/products/products.template.html',
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
		console.log('#####!!!!!#######');
		this._productService.getProducts()
			.subscribe(
				data => { this.products = data },
				err => console.error(err),
				() => console.log('Products loaded!!')
			);
	}
}
