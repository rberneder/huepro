import {Component, OnInit, HostListener, Directive} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Product} from "./product";
import {ProductService} from "./product.service";
import {ScrollService} from "../util/scroll/scroll.service";
import {ScrollListener} from "../util/scroll/scroll-listener";

@Component({
    selector: "product-list",
    templateUrl: '/templates/products/product-list.template.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit, ScrollListener {

    private products: Product[];
    private productsSorted: Product[];
    private indices: any;
    private $products: any;
    private $mainContent: any;

    constructor(private _productService: ProductService, private _scrollService: ScrollService) {
        this.productsSorted = new Array();
        this.indices = new Array();
        this._scrollService.subscribe(this);
    }

    ngOnInit() {
        this._productService.getProducts()
            .subscribe(data => {
                this.products = data;
                this.sortProducts();
            });
        this.$products= document.getElementById('product-list__cont').children;
        this.$mainContent = document.getElementById('main-content');
    }

    resetProductArrays() {
        while (this.productsSorted.length) {
            this.productsSorted.pop();
        }
        while (this.indices.length) {
            this.indices.pop();
        }
    }

    activateIndex(key) {
        for (let i = 0; i < this.indices.length; i++) {
            this.indices[i].active = (this.indices[i].name[0] === key);
        }
    }

    scroll(event):any {
        if (!this.$products || !this.$mainContent) return;
        let scanBorder = this.$products[0].offsetTop;
        let scrolled = this.$mainContent.scrollTop;
        let height = this.$products[0].offsetHeight;
        for (let i = 0; i < this.$products.length; i++) {
            if (this.$products[i].offsetTop - scanBorder >= scrolled - height) {
                this.activateIndex(this.products[i].name[0]);
                break;
            }
        }
    }

    scrollTo($event) {
        $event.preventDefault();
        console.log($event.target.getAttribute('href'));
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
                let count = 0;
                this.resetProductArrays();

                for (let product of this.products) {
                    let actLetter = product.name[0].toUpperCase();
                    if (actLetter !== letter) {
                        letter = actLetter;
                        this.indices.push({name: letter, selector: 'product-' + count, active: false});
                    }
                    this.productsSorted.push(product);
                    count++;
                }
                break;

            default:
                console.warn('Wrong product sort criteria.');
                break;
        }
    }
    
    
}