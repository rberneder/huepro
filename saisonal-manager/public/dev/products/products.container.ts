import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {ProductService} from "./product.service";
import {ProductsComponent} from "./products.component";

@Component({
	selector: "products",
	templateUrl: '/templates/products/products.container.template.html',
	providers: [ProductService],
	directives: [ROUTER_DIRECTIVES, ProductsComponent]

})
@RouteConfig([
	{path: '/neu', name: 'NewProduct', component: ProductsComponent, useAsDefault: true},
])
export class ProductsContainer {
}
