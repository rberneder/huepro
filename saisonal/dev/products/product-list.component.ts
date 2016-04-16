import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from "angular2/http";
import {Product} from "./product";
import {ProductService} from "./product.service";

@Component({
    selector: "product-list",
    templateUrl: '/templates/products/product-list.template.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {

    private products:Product[];

    constructor(private http: Http, private _productService: ProductService) {
        
    }

    ngOnInit() {
        this._productService.getProducts()
            .subscribe(
                data => this.products = data
            )
    }
    
}