import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {RouteConfig} from "angular2/router";
import {SeasonCalendarComponent} from "./season-calendar/season-calendar.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {PopularProductsComponent} from "./popular-products/popular-products.component";

@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    directives: [SeasonCalendarComponent, ROUTER_DIRECTIVES, PopularProductsComponent]
})
@RouteConfig([
    {path: '/saisonkalender/:month', name: 'SeasonCalendar', component: SeasonCalendarComponent},
    {path: '/rezepte', name: 'Recipes', component: RecipesComponent}
])
export class AppComponent {
    private month;

    constructor(private _router: Router) {
        this.month = new Date().getMonth();
    };
}
