import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
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


	getProducts() {
		this._productService.getProducts().then((products: Product[]) => this.products = products);
	}

	onEdit() {
		this.editing = true;
	}

	ngOnInit():any {
		this.getProducts();
		console.log('Products loaded');
	}
}