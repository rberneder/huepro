import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteConfig} from "angular2/router";
import {SeasonCalendarComponent} from "./season-calendar/season-calendar.component";
import {RecipesComponent} from "./recipes/recipes.component";

@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    directives: [SeasonCalendarComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/saisonkalender', name: 'SeasonCalendar', component: SeasonCalendarComponent},
    {path: '/rezepte', name: 'Recipes', component: RecipesComponent}
])
export class AppComponent {

}
