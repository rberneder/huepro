import {Component} from "angular2/core";
import {OnInit} from "angular2/core";

@Component({
	selector: "products",
	templateUrl: '/templates/products/products.template.html',
})
export class ProductsComponent implements OnInit {
	ngOnInit():any {
		console.log('Products loaded');
	}
}