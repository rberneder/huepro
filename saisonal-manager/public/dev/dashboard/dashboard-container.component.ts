import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {DashboardOverviewComponent} from "./dashboard-overview.component";

@Component({
    selector: "dashboard",
    templateUrl: '/templates/dashboard/dashboard-container.template.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'DashboardOverview', component: DashboardOverviewComponent, useAsDefault: true}
])
export class DashboardContainerComponent {
}
