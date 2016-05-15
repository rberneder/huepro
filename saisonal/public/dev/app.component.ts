import {Component, OnInit, ElementRef} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {SeasonCalendarComponent} from "./season-calendar/season-calendar.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {FreshProductsComponent} from "./fresh-products/fresh-products.component";
import {ProductService} from "./products/product.service";
import {SearchComponent} from "./search/search.component";
import {ProductContainerComponent} from "./products/product-container.component";
import {ScrollService} from "./util/scroll/scroll.service";



@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    providers: [ProductService],
    directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/', name: 'FreshProducts', component: FreshProductsComponent, useAsDefault: true},
    {path: '/produkte/...', name: 'Products', component: ProductContainerComponent},
    {path: '/saisonkalender/:month', name: 'SeasonCalendar', component: SeasonCalendarComponent},
    {path: '/rezepte', name: 'Recipes', component: RecipesComponent},
    {path: '/suche', name: 'Search', component: SearchComponent},
])
export class AppComponent implements OnInit {

    private month;

    constructor(private _productService: ProductService, private _scrollService: ScrollService) {
        this.month = new Date().getMonth();
    };

    ngOnInit() {}
}
