import {Component, ElementRef, OnInit} from "angular2/core";
import {AnimationBuilder} from 'css-animator/builder';
import {AnimationService} from 'css-animator/modules';
import {ProductService} from "../products/product.service";
import {Product} from "../products/product";

@Component({
    selector: "fresh-products",
    templateUrl: '/templates/fresh-products/fresh-products.template.html',
    providers: [AnimationService],
})
export class FreshProductsComponent implements OnInit {

    private products: Product[];
    private shownProd: number;
    private canSlideUp: boolean;
    private canSlideDown: boolean;
    private $animationPane;

    constructor(private _productService: ProductService) {
        this.shownProd = -1;
        this.canSlideUp = false;
        this.canSlideDown = false;
    }

    ngOnInit(): any {
        this._productService
            .getProducts()
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
    }

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
}