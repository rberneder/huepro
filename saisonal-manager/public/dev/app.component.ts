import {Component, ElementRef} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ProductService} from "./products/product.service";
import {ProductContainerComponent} from "./products/product-container.component";
import {DashboardContainerComponent} from "./dashboard/dashboard-container.component";
import {TrendContainerComponent} from "./trend/trend-container.component";

@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    providers: [ProductService],
    directives: [ProductContainerComponent, RecipesComponent, DashboardContainerComponent, ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/uebersicht/...', name: 'Dashboard', component: DashboardContainerComponent, useAsDefault: true},
    {path: '/trend/...', name: 'Trend', component: TrendContainerComponent},
    {path: '/produkte/...', name: 'Products', component: ProductContainerComponent},
    {path: '/rezepte', name: 'Recipes', component: RecipesComponent},
])

export class AppComponent{
    constructor(private  _productService: ProductService){}
}