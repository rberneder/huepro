import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppComponent }         from './app.component';
import {FreshProductsComponent} from "./fresh-products/fresh-products.component";
import {ProductContainerComponent} from "./products/product-container.component";
import {SeasonCalendarContainerComponent} from "./season-calendar/season-calendar-container.component";
import {RecipeContainerComponent} from "./recipes/recipe-container.component";
import {SearchComponent} from "./search/search.component";
import {ContactComponent} from "./contact/contact.component";
import {ImprintComponent} from "./imprint/imprint.component";
import {ProductService} from "./products/product.service";
import {ScrollService} from "./util/scroll/scroll.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {path: '/', name: 'FreshProducts', component: FreshProductsComponent, useAsDefault: true},
            {path: '/produkte/...', name: 'Products', component: ProductContainerComponent},
            {path: '/saisonkalender/...', name: 'SeasonCalendar', component: SeasonCalendarContainerComponent},
            {path: '/rezepte/...', name: 'Recipes', component: RecipeContainerComponent},
            {path: '/suche', name: 'Search', component: SearchComponent},
            {path: '/kontakt', name: 'Contact', component: ContactComponent},
            {path: '/impressum', name: 'Imprint', component: ImprintComponent}
        ])
    ],
    declarations: [
        AppComponent,
        HeroListComponent,
        CrisisListComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

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








@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    providers: [ProductService]
})
