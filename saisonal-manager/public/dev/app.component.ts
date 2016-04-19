import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {RouteConfig} from "angular2/router";
import {ProductsComponent} from "./products/products.component.ts";
import {RecipesComponent} from "./recipes/recipes.component.ts";
import {NewProductComponent} from "./products/new-product.component.ts";

@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    directives: [ProductsComponent, RecipesComponent, NewProductComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/produkte', name: 'Products', component: ProductsComponent},
    {path: '/rezepte', name: 'Recipes', component: RecipesComponent},
    {path: '/produkte/neu', name: 'NewProduct', component: NewProductComponent},
])


export class AppComponent{
    public smallMenu = false;

    menuActive() {
        this.smallMenu = true;
    }
}