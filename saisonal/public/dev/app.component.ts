import {Component, OnInit, ElementRef} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {SeasonCalendarComponent} from "./season-calendar/season-calendar.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {PopularProductsComponent} from "./popular-products/popular-products.component";
import {ProductDetailsComponent} from "./products/product-details.component";
import {ProductListComponent} from "./products/product-list.component";
import {ProductService} from "./products/product.service";



@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    providers: [ProductService],
    directives: [SeasonCalendarComponent, ROUTER_DIRECTIVES, PopularProductsComponent],
})
@RouteConfig([
    {path: '/produkt/:productId', name: 'ProductDetails', component: ProductDetailsComponent},
    {path: '/produkte', name: 'Products', component: ProductListComponent},
    {path: '/saisonkalender/:month', name: 'SeasonCalendar', component: SeasonCalendarComponent},
    {path: '/rezepte', name: 'Recipes', component: RecipesComponent},
])
export class AppComponent implements OnInit {

    private month;
    private searchResults;

    constructor(private _router: Router, private _productService:ProductService) {
        this.month = new Date().getMonth();
    };

    ngOnInit() {}

    searchFor(str) {
        if (str.length < 3) {
            this.searchResults = [];
        } else {
            this._productService.searchFor(str).subscribe(
                products => this.searchResults = products
            );
        }
    }
}
