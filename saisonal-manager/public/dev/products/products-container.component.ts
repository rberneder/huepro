import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {ProductService} from "./product.service";
import {NewProductComponent} from "./new-product.component";
import {NewCategoryComponent} from "./category/new-category.component";
import {NewFamilyComponent} from "./family/new-family.component";

@Component({
	selector: "products",
	templateUrl: '/templates/products/products-container.template.html',
	providers: [ProductService],
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path: '/neu', name: 'NewProduct', component: NewProductComponent, useAsDefault: true},
	{path: '/kategorie-neu', name: 'NewCategory', component: NewCategoryComponent},
	{path: '/familie-neu', name: 'NewFamily', component: NewFamilyComponent},
])
export class ProductsContainerComponent {
}
