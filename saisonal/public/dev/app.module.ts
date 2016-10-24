import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }   from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { routing } from './router.module';

import { ScrollService } from "./util/scroll/scroll.service";
import { ModusService } from "./util/modus.service";
import { FreshProductsComponent } from "./fresh-products/fresh-products.component";
import { ImprintComponent } from "./imprint/imprint.component";
import { SearchComponent } from "./search/search.component";
import { ContactComponent } from "./contact/contact.component";
import { AppComponent } from "./app.component";
import {SeasonCalendarComponent} from "./season-calendar/season-calendar.component";
import {RecipeListComponent} from "./recipes/recipe-list.component";
import {RecipeDetailsComponent} from "./recipes/recipe-details.component";
import {ProductListComponent} from "./products/product-list.component";
import {ProductDetailsComponent} from "./products/product-details.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        FreshProductsComponent,
        SeasonCalendarComponent,
        ProductListComponent,
        ProductDetailsComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        SearchComponent,
        ContactComponent,
        ImprintComponent
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ScrollService, useClass: ScrollService },
        { provide: ModusService, useClass: ModusService }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}