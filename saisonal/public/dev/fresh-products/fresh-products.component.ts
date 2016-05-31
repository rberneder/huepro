import {Component, ElementRef, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {AnimationBuilder} from 'css-animator/builder';
import {AnimationService} from 'css-animator/modules';
import {ProductService} from "../products/product.service";
import {Product} from "../products/product";
import {Month} from "../util/month";
import {MONTHS} from "../util/month.seed";

declare var Hammer: any;

@Component({
    selector: "fresh-products",
    templateUrl: '/templates/fresh-products/fresh-products.template.html',
    providers: [AnimationService],
})
export class FreshProductsComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private products: Product[];
    private shownProd: number;
    private canSlideUp: boolean;
    private canSlideDown: boolean;
    private $animationPane;
    private monthNames: Month[];
    private swipeHandler: any;



    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor(private _productService: ProductService, private _router: Router) {
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
        this.$animationPane = document.getElementById('animation-pane');
        this.setUpTouchGestures();
    }

    setUpTouchGestures() {
        this.swipeHandler = new Hammer(this.$animationPane);
        this.swipeHandler.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

        this.swipeHandler.on('pan', (event) => {
            if (!event.isFinal) return;
            if (event.deltaY > 0) {
                this.slide('up');
            } else {
                this.slide('down');
            }
        });
    }



    /*
     * ///////// NAVIGATION /////////
     * */
    goToProduct(product) {
        this._router.navigate(['Products/ProductDetails', {id: product._id}]);
    }



    /*
     * ///////// ANIMATION /////////
     * */
    updateAnimationPane() {
        const height = 10,
            translateY = this.shownProd * height;
        this.$animationPane.style.transform= 'translateY(-' + translateY + 'vh)';
    }

    updateSliderBtns() {
        this.canSlideUp = (this.shownProd > 0);
        this.canSlideDown = (this.shownProd < (this.products.length - 1));
    }

    slide(direction) {
        switch (direction) {
            case 'up':
                if (this.shownProd < 1) return;
                this.shownProd--;
                break;

            case 'down':
                if (this.shownProd >= this.products.length) return;
                this.shownProd++;
                break;
        }
        this.updateSliderBtns();
        this.updateAnimationPane();
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