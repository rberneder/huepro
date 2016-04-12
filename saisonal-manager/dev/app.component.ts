import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {RouteConfig} from "angular2/router";
import {ProductsComponent} from "./products/products.component";
import {RecipesComponent} from "./recipes/recipes.component";

@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    directives: [ProductsComponent, RecipesComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/produkte', name: 'Products', component: ProductsComponent},
    {path: '/rezepte', name: 'Recipes', component: RecipesComponent}
])

export class AppComponent{
    
}