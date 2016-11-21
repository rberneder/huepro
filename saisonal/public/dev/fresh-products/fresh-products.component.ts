import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ScrollService} from "../util/scroll/scroll.service";
import {ProductService} from "../products/product.service";
import {Product} from "../products/product";
import {Month} from "../util/month";
import {MONTHS} from "../util/month.seed";

declare var Hammer: any;

@Component({
    selector: "fresh-products",
    templateUrl: '/templates/fresh-products/fresh-products.template.html'
})
export class FreshProductsComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private products: Product[];
    private $products: any;
    private shownProd: number;
    private canSlideUp: boolean;
    private canSlideDown: boolean;
    private monthNames: Month[];



    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor(private _productService: ProductService, private _router: Router, private _scrollService: ScrollService) {
        this.shownProd = -1;
        this.canSlideUp = false;
        this.canSlideDown = false;
        this.monthNames = MONTHS;
    }

    ngOnInit(): any {
        this._productService
            .getFreshProducts()
            .subscribe((products: Product[]) => {
                if (products.length > 0) {
                    this.products = products;
                    this.shownProd = 0;
                    if (products.length > 1) {
                        this.canSlideDown = true;
                    }
                }
            });

        this.setUpScrollListener();
    }

    setUpScrollListener() {
        this.$products = document.getElementsByTagName('article');

        this._scrollService.subscribe((event) => {
            this.shownProd = 0;

            if (window.scrollY > 0) {
                for (let $product of this.$products) {
                    if ($product.offsetTop < (window.scrollY)) {
                        this.shownProd++;
                    }
                }
            }
            this.updateSliderBtns();
        });
    }



    /*
     * ///////// NAVIGATION /////////
     * */
    goToProduct(product) {
        this._router.navigate(['produkte/produkt', product._id]);
    }



    /*
     * ///////// ANIMATION /////////
     * */
    updateSliderBtns() {
        this.canSlideUp = (this.shownProd > 0);
        this.canSlideDown = (this.shownProd < (this.products.length - 1));
    }

    slide(direction) {
        switch (direction) {
            case 'up':
                if (this.shownProd < 1) return;
                this._scrollService.scrollTo(this.$products[this.shownProd - 1]);
                break;

            case 'down':
                if (this.shownProd >= this.products.length - 1) return;
                this._scrollService.scrollTo(this.$products[this.shownProd + 1]);
                break;
        }
        this.updateSliderBtns();
    }

    /*private animator: AnimationBuilder;

     constructor (_animationService: AnimationService, private _elementRef: ElementRef) {
     this.animator = _animationService.builder();
     }

     ngOnInit():any {
     this.animator.setType('fadeInUp').show(this._elementRef.nativeElement);
     }*/



    /*
     * ///////// HELPER FUNCTIONS /////////
     * */
    getHarvestInfo(product) {
        let res = this.monthNames[product.harvestStartMonth].name;
        if (product.harvestStartMonth != product.harvestEndMonth) {
            res += ' - ' + this.monthNames[product.harvestEndMonth].name;
        }
        return res;
    }
}