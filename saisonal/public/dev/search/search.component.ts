import {Component} from 'angular2/core';
import {Product} from "../products/product";
import {ProductService} from "../products/product.service";

@Component({
    selector: 'search',
    templateUrl: '/templates/search/search.template.html',
    providers: [ProductService],
})
export class SearchComponent {

    private products:Product[];
    private searchResults;


    constructor(private _productService: ProductService) {
        this.searchResults = [];
        this.products = [];
    }


    searchFor(str) {
        this.searchResults = [];
        if (str.length > 1) {
            if (!this.products.length) {
                this._productService.getProducts().subscribe(
                    products => this.products = products
                );
            }
            for (var product of this.products) {
                if (product.name.match(new RegExp('(' + str + ')', 'i'))) {
                    this.searchResults.push(product);
                }
            }
        }
    }
}