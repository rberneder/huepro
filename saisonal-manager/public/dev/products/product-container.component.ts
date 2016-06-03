import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {ProductService} from "./product.service";
import {NewCategoryComponent} from "./category/new-category.component";
import {NewFamilyComponent} from "./family/new-family.component";
import {ProductManagerComponent} from "./product/product-manager.component";

@Component({
	selector: "products",
	templateUrl: '/templates/products/product-container.template.html',
	providers: [ProductService],
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path: '/', name: 'Product', component: ProductManagerComponent, useAsDefault: true},
	{path: '/familie', name: 'Family', component: NewFamilyComponent},
	{path: '/kategorie', name: 'Category', component: NewCategoryComponent}
])
export class ProductContainerComponent {
}
