import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {ProductService} from "./product.service";
import {NewProductComponent} from "./new-product.component";
import {NewCategoryComponent} from "./category/new-category.component";
import {NewFamilyComponent} from "./family/new-family.component";
import {ChangeProductComponent} from "./change-product.component";
import {ChangeCategoryComponent} from "./category/change-category.component";
import {ChangeFamilyComponent} from "./family/change-family.component";

@Component({
	selector: "products",
	templateUrl: '/templates/products/products-container.template.html',
	providers: [ProductService],
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path: '/neu', name: 'NewProduct', component: NewProductComponent, useAsDefault: true},
	{path: '/bearbeiten', name: 'ChangeProduct', component: ChangeProductComponent},
	{path: '/kategorie-neu', name: 'NewCategory', component: NewCategoryComponent},
	{path: '/kategorie-bearbeiten', name: 'ChangeCategory', component: ChangeCategoryComponent},
	{path: '/familie-neu', name: 'NewFamily', component: NewFamilyComponent},
	{path: '/familie-bearbeiten', name: 'ChangeFamily', component: ChangeFamilyComponent},
])
export class ProductsContainerComponent {
}
