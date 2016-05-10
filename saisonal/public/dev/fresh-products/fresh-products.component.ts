import { Component, ElementRef, OnInit } from "angular2/core";
import { AnimationBuilder } from 'css-animator/builder';
import { AnimationService } from 'css-animator/modules';

@Component({
    selector: "fresh-products",
    templateUrl: '/templates/fresh-products/fresh-products.template.html',
    providers: [AnimationService],
})
export class FreshProductsComponent implements OnInit {

    private animator: AnimationBuilder;

    constructor (_animationService: AnimationService, private _elementRef: ElementRef) {
        this.animator = _animationService.builder();
    }

    ngOnInit():any {
        this.animator.setType('fadeInUp').show(this._elementRef.nativeElement);
    }
}