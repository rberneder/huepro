import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {ProductService} from "./product.service";
import {ProductManagerComponent} from "./product/product-manager.component";
import {FamilyManagerComponent} from "./family/family-manager.component";
import {CategoryManagerComponent} from "./category/category-manager.component";

@Component({
	selector: "products",
	templateUrl: '/templates/products/product-container.template.html',
	providers: [ProductService],
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path: '/', name: 'Product', component: ProductManagerComponent, useAsDefault: true},
	{path: '/familie', name: 'Family', component: FamilyManagerComponent},
	{path: '/kategorie', name: 'Category', component: CategoryManagerComponent}
])
export class ProductContainerComponent {
}