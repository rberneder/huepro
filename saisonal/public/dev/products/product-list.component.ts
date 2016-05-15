import {Component, OnInit, OnDestroy, HostListener, Directive} from 'angular2/core';
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
export class ProductListComponent implements OnInit, OnDestroy, ScrollListener {

    private products: Product[];
    private productsSorted: Product[];
    private indices: any;
    private $products: any;

    constructor(private _productService: ProductService, private _scrollService: ScrollService) {
        this.productsSorted = new Array();
        this.indices = new Array();
        this._scrollService.subscribe(this);
    }

    ngOnInit() {
        this._productService.getProducts()
            .subscribe((data: Product[]) => {
                this.products = data;
                this.sortProducts();
            });
        this.$products= document.getElementById('product-list__cont').children;
    }

    ngOnDestroy() {
        this._scrollService.unsubscribe(this);
    }

    resetProductArrays() {
        while (this.productsSorted.length) {
            this.productsSorted.pop();
        }
        while (this.indices.length) {
            this.indices.pop();
        }
    }

    updateIndex(keyArr) {
        for (let i = 0; i < this.indices.length; i++) {
            this.indices[i].active = (keyArr.indexOf(this.indices[i].name[0].toUpperCase()) >= 0);
        }
    }

    scroll(event): any {
        if (!this.$products) return;
        let scanBorder = window.scrollY + this.$products[0].offsetTop / 4;
        let height = 1.5 * this.$products[0].offsetHeight;
        let activeIndices = new Array();
        for (let i = 0; i < this.$products.length; i++) {
            let key = this.products[i].name[0].toUpperCase();
            if (this.$products[i].offsetTop >= scanBorder &&
                this.$products[i].offsetTop < (scanBorder + height) &&
                activeIndices.indexOf(key) < 0) {
                activeIndices.push(key);
            }
        }
        this.updateIndex(activeIndices);
    }

    scrollTo(event) {
        event.preventDefault();
        let id = event.target.getAttribute('href'),
            $element = document.getElementById(id);
        if ($element) {
            this._scrollService.scrollTo($element);
        }
    }

    sortProducts(sortCriteria = 'name asc') {
        switch (sortCriteria) {
            case 'name asc':
                this.products.sort(function(a, b){
                    if(a.name.toUpperCase() < b.name.toUpperCase()) return -1;
                    if(a.name.toUpperCase() > b.name.toUpperCase()) return 1;
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