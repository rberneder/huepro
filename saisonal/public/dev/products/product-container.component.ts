import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteConfig} from "angular2/router";
import {ProductListComponent} from "./product-list.component";
import {ProductDetailsComponent} from "./product-details.component";

@Component({
    selector: "product-container",
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'ProductList', component: ProductListComponent, useAsDefault: true},
    {path: '/produkt/:id', name: 'ProductDetails', component: ProductDetailsComponent}
])
export class ProductContainerComponent {
}