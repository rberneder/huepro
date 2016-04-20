import {Component, ElementRef} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {ProductsComponent} from "./products/products.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {NewProductComponent} from "./products/new-product.component";
import {ProductService} from "./products/product.service";

@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    providers: [ProductService],
    directives: [ProductsComponent, RecipesComponent, NewProductComponent, ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/produkte', name: 'Products', component: ProductsComponent},
    {path: '/rezepte', name: 'Recipes', component: RecipesComponent},
    {path: '/produkte/neu', name: 'NewProduct', component: NewProductComponent},
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