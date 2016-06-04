import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {TrendProductRankingComponent} from "./trend-product-ranking.component";

@Component({
    selector: "trend",
    templateUrl: '/templates/trend/trend-container.template.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'TrendProductRanking', component: TrendProductRankingComponent, useAsDefault: true}
])
export class TrendContainerComponent {
}
