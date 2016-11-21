import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {RecipeDetailsComponent} from "./recipe-details.component";
import {RecipeListComponent} from "./recipe-list.component";

@Component({
    selector: "product-container",
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'RecipeList', component: RecipeListComponent, useAsDefault: true},
    {path: '/rezept/:id', name: 'RecipeDetails', component: RecipeDetailsComponent}
])
export class RecipeContainerComponent {
}