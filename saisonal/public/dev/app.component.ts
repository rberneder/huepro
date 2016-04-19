import {Component, OnInit, ElementRef} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {SeasonCalendarComponent} from "./season-calendar/season-calendar.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {PopularProductsComponent} from "./popular-products/popular-products.component";
import {ProductDetailsComponent} from "./products/product-details.component";
import {ProductListComponent} from "./products/product-list.component";
import {ProductService} from "./products/product.service";
import {Product} from "./products/product";



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
    private products:Product[]; // needed for search
    private searchResults;

    constructor(private _router: Router, private _productService:ProductService) {
        this.month = new Date().getMonth();
        this.searchResults = [];
        this.products = [];
    };

    ngOnInit() {}

    searchFor(str) {
        this.searchResults = [];
        if (str.length > 1) {
            if (!this.products.length) {
                this._productService.getProducts().subscribe(
                    products => this.products = products
                );
            }
            for (var product of this.products) {
                if (product.name.match(new RegExp('(' + str + ')', 'i'))) {
                    this.searchResults.push(product);
                }
            }
        }
    }
}
