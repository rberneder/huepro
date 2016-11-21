import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from "../products/product";
import {ProductService} from "../products/product.service";
import {ModusService} from "../util/modus.service";

@Component({
    selector: 'search',
    templateUrl: '/templates/search/search.template.html',
    providers: [ProductService]
})
export class SearchComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private products:Product[];
    private searchResults: any;
    private actMonth: number;



    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor(private _productService: ProductService, private _router: Router, private _modus: ModusService) {
        this.products = [];
        this.actMonth = new Date().getMonth();
        this.searchResults = {
            name: new Array<Product>(),
            family: new Array<Product>()
        };
    }

    ngOnInit() {
        this._productService.getProducts()
            .subscribe(products => this.products = products);
    }



    /*
     * ///////// SEARCH /////////
     * */
    resetSearch() {
        this.searchFor();
    }

    searchFor(str = '') {
        this.searchResults.name.splice(0);
        this.searchResults.family.splice(0);
        if (str.length > 1 && this.products.length) {
            var searchPattern = new RegExp('(' + str + ')', 'i');
            for (var product of this.products) {
                if (product.name.match(searchPattern)) this.searchResults.name.push(product);
                if (product.family.match(searchPattern)) this.searchResults.family.push(product);
            }
        }
    }



    /*
     * ///////// NAVIGATION /////////
     * */
    goToProduct(product) {
        if (product) {
            this._modus.setModus('search');
            this._router.navigate(['/produkte/produkt', product._id]);
        }
    }
}