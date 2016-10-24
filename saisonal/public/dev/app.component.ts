import { Component } from "@angular/core";
import { ProductService } from "./products/product.service";
import { ScrollService } from "./util/scroll/scroll.service";


@Component({
    selector: 'app',
    templateUrl: '/templates/app.template.html',
    providers: [ProductService]
})
export class AppComponent {

    private month;
    private mobileMenuActive: boolean;

    constructor(private _productService: ProductService, private _scrollService: ScrollService) {
        this.month = new Date().getMonth();
        this.mobileMenuActive = false;
    };

    closeMobileNav() {
        if (this.mobileMenuActive == true) {
            this.toggleMobileNav();
        }
    }

    toggleMobileNav() {
        this.mobileMenuActive = !this.mobileMenuActive;
    }
}








