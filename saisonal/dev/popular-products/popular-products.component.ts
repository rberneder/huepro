import { Component, ElementRef, OnInit } from "angular2/core";
import { AnimationBuilder } from 'css-animator/builder';
import { AnimationService } from 'css-animator/modules';

@Component({
    selector: "popular-products",
    templateUrl: '/templates/popular-products/popular-products.template.html',
    providers: [AnimationService],
})
export class PopularProductsComponent implements OnInit {

    private animator: AnimationBuilder;

    constructor (_animationService: AnimationService, private _elementRef: ElementRef) {
        this.animator = _animationService.builder();
    }

    ngOnInit():any {
        this.animator.setType('fadeInUp').show(this._elementRef.nativeElement);
    }
}