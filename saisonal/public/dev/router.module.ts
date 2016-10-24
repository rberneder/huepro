import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreshProductsComponent } from "./fresh-products/fresh-products.component";
import { SearchComponent } from "./search/search.component";
import { ContactComponent } from "./contact/contact.component";
import { ImprintComponent } from "./imprint/imprint.component";
import { RecipeDetailsComponent } from "./recipes/recipe-details.component";
import { RecipeListComponent } from "./recipes/recipe-list.component";
import { SeasonCalendarComponent } from "./season-calendar/season-calendar.component";
import {ProductListComponent} from "./products/product-list.component";
import {ProductDetailsComponent} from "./products/product-details.component";


const appRoutes: Routes = [
    {path: '', component: FreshProductsComponent},

    {path: 'saisonkalender', children: [
        {path: '', component: SeasonCalendarComponent},
        {path: ':month', component: SeasonCalendarComponent}
    ]},

    {path: 'produkte', children: [
        {path: '', component: ProductListComponent},
        {path: 'produkt/:id', component: ProductDetailsComponent}
    ]},

    {path: 'rezepte', children: [
        {path: '', component: RecipeListComponent},
        {path: 'rezept/:id', component: RecipeDetailsComponent}
    ]},

    {path: 'suche', component: SearchComponent},
    {path: 'kontakt', component: ContactComponent},
    {path: 'impressum', component: ImprintComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);