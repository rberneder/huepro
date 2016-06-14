import {Component, ElementRef} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {FreshProductsComponent} from "./fresh-products/fresh-products.component";
import {ProductService} from "./products/product.service";
import {SearchComponent} from "./search/search.component";
import {ProductContainerComponent} from "./products/product-container.component";
import {ScrollService} from "./util/scroll/scroll.service";
import {SeasonCalendarContainerComponent} from "./season-calendar/season-calendar-container.component";
import {ContactComponent} from "./contact/contact.component";
import {ImprintComponent} from "./imprint/imprint.component";
import {RecipeContainerComponent} from "./recipes/recipe-container.component";



@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    providers: [ProductService],
    directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/', name: 'FreshProducts', component: FreshProductsComponent, useAsDefault: true},
    {path: '/produkte/...', name: 'Products', component: ProductContainerComponent},
    {path: '/saisonkalender/...', name: 'SeasonCalendar', component: SeasonCalendarContainerComponent},
    {path: '/rezepte/...', name: 'Recipes', component: RecipeContainerComponent},
    {path: '/suche', name: 'Search', component: SearchComponent},
    {path: '/kontakt', name: 'Contact', component: ContactComponent},
    {path: '/impressum', name: 'Imprint', component: ImprintComponent},
])
export class AppComponent {

    private month;
    private mobileMenuActive: boolean;

    constructor(private _productService: ProductService, private _scrollService: ScrollService) {
        this.month = new Date().getMonth();
        this.mobileMenuActive = false;
    };

    closeMobileNav() {
        if (this.mobileMenuActive == true) {
            this.toggleMobileNav();
        }
    }
    
    toggleMobileNav() {
        this.mobileMenuActive = !this.mobileMenuActive;
    }
}
