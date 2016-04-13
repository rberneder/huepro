import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteParams} from "angular2/router";
import {OnInit} from "angular2/core";
import {ProductService} from "./product.service";

@Component({
    templateUrl: '/templates/products/product-details.template.html',
    providers: [ProductService]
})
export class ProductDetailsComponent implements OnInit {

    private product;

    constructor(private _router: Router, private _routerParams: RouteParams, private _productService: ProductService) {}

    ngOnInit():any {
        let productId = parseInt(this._routerParams.get('productId'));
        this.product = this._productService.getProduct(productId);

        if (!this.product) {
            this._router.navigate(['SeasonCalendar']);
        }
    }
}