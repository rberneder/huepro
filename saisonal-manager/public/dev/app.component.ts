import {Component, ElementRef} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ProductService} from "./products/product.service";
import {ProductContainerComponent} from "./products/product-container.component";

@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    providers: [ProductService],
    directives: [ProductContainerComponent, RecipesComponent, ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/produkte/...', name: 'Products', component: ProductContainerComponent, useAsDefault: true},
    {path: '/rezepte', name: 'Recipes', component: RecipesComponent},
])
export class AppComponent{
    public smallMenu;

    constructor(private  _productService: ProductService){
        this.smallMenu = false;
    }

    menuActive() {
        this.smallMenu = true;
    }
}