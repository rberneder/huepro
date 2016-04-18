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
    private productsSorted;
    private sortCriteria:string;

    constructor(private http: Http, private _productService: ProductService) {
        this.productsSorted = new Array();
    }


    ngOnInit() {
        this._productService.getProducts()
            .subscribe(data => {
                this.products = data;
                this.sortProducts();
            });
    }


    sortProducts(sortCriteria = 'name asc') {
        switch (sortCriteria) {
            case 'name asc':
                this.products.sort(function(a, b){
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                });

                let letter = '';
                let count = -1;

                while (this.productsSorted.length) {
                    this.productsSorted.pop();
                }

                for (let product of this.products) {
                    let actLetter = product.name[0].toUpperCase();
                    if (actLetter !== letter) {
                        letter = actLetter;
                        this.productsSorted.push({
                            groupName: letter,
                            products: [product]
                        });
                        count++;
                    } else {
                        this.productsSorted[count].products.push(product);
                    }
                }
                break;

            default:
                console.warn('Wrong product sort criteria.');
                break;
        }
    }
    
    
}