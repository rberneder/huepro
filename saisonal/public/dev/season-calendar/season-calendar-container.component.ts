import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {SeasonCalendarComponent} from "./season-calendar.component";

@Component({
    selector: "season-calendar-container",
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'SeasonCalendarDef', component: SeasonCalendarComponent, useAsDefault: true},
    {path: '/:month', name: 'SeasonCalendarMonth', component: SeasonCalendarComponent}
])
export class SeasonCalendarContainerComponent {
}