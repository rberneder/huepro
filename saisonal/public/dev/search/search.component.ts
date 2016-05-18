import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Product} from "../products/product";
import {ProductService} from "../products/product.service";
import {ModusService} from "../util/modus.service";

@Component({
    selector: 'search',
    templateUrl: '/templates/search/search.template.html',
    providers: [ProductService],
    directives: [ROUTER_DIRECTIVES]
})
export class SearchComponent implements OnInit {

    private products:Product[];
    private searchResults;


    constructor(private _productService: ProductService, private _router: Router, private _modus: ModusService) {
        this.searchResults = [];
        this.products = [];
    }

    goToProduct(product) {
        if (product) {
            this._modus.setModus('search');
            this._router.navigate(['/Products/ProductDetails', {id: product._id}]);
        }
    }


    ngOnInit() {
        this._productService.getProducts().subscribe(
            products => this.products = products
        );
    }

    resetSearch() {
        this.searchFor();
    }

    searchFor(str = '') {
        this.searchResults.splice(0);
        if (str.length > 1 && this.products.length) {
            for (var product of this.products) {
                if (product.name.match(new RegExp('(' + str + ')', 'i'))) {
                    this.searchResults.push(product);
                }
            }
        }
    }
}