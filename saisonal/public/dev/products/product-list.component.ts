import {Component, OnInit, HostListener, Directive} from '@angular/core';
import {Product} from "./product";
import {ProductService} from "./product.service";
import {ScrollService} from "../util/scroll/scroll.service";
import {Category} from "./category";

@Component({
    selector: "product-list",
    templateUrl: '/templates/products/product-list.template.html',
    providers: [ProductService]
})
export class ProductListComponent implements OnInit  {


    /*
    * ///////// ATTRIBUTES /////////
    * */
    private products: Product[];
    private productsSorted: Product[];
    private indices: any;
    private $products: any;
    private filterMenuActive: boolean;
    private categories: any;
    private filteredCategories: string[];
    private filterRipe: boolean;
    private actMonth: number;



    /*
     * ///////// INITIALIZATION / DESTRUCTION /////////
     * */
    constructor(private _productService: ProductService, private _scrollService: ScrollService) {
        this.productsSorted = new Array();
        this.indices = new Array();
        this.categories = new Array();
        this.filteredCategories = new Array();
        this.filterMenuActive = false;
        this.filterRipe = false;
        this.actMonth = new Date().getMonth();
    }

    ngOnInit() {
        this._scrollService.subscribe(this.scroll);
        this._productService.getProducts()
            .subscribe((data: Product[]) => {
                this.products = data;
                this.sortProducts();
                this.initializeCategories();
                setTimeout(() => this.scroll(null), 500);
            });
        this.$products = document.getElementById('product-list__cont').children;
    }

    initializeCategories() {
        function categoryExists(name: string, categories: Category[]) {
            for (let category of categories) {
                if (category.name === name) return true;
            }
            return false;
        }

        for (let product of this.products) {
            if (!categoryExists(product.category, this.categories)) {
                this.categories.push({
                    name: product.category,
                    active: false
                });
            }
        }
    }




    /*
     * ///////// FILTER /////////
     * */
    setFilter(name: string, activate: boolean) {
        if (activate) {
            this.filteredCategories.push(name);
        } else {
            this.filteredCategories.splice(this.filteredCategories.indexOf(name), 1);
        }
    }

    onlyShowRipe(apply: boolean) {
        this.filterRipe = apply;
    }

    toggleFilterMenu() {
        this.filterMenuActive = !this.filterMenuActive;
    }




    /*
     * ///////// SORT PRODUCTS /////////
     * */
    resetProductArrays() {
        while (this.productsSorted.length) {
            this.productsSorted.pop();
        }
        while (this.indices.length) {
            this.indices.pop();
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



    /*
     * ///////// SCROLL /////////
     * */
    updateIndex(keyArr) {
        for (let i = 0; i < this.indices.length; i++) {
            this.indices[i].active = (keyArr.indexOf(this.indices[i].name[0].toUpperCase()) >= 0);
        }
    }

    scroll = (event) => {
        if (!this.$products || this.$products.length < 1) return;
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
}