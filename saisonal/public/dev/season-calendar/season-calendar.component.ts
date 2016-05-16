import {Component, OnInit} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {ProductService} from "../products/product.service";
import {Product} from "../products/product";
import {MONTHS} from "../util/month.seed";
import {Month} from "../util/month";

@Component({
    selector: "season-calendar",
    templateUrl: '/templates/season-calendar/season-calendar.template.html',
    providers: [ProductService]
})
export class SeasonCalendarComponent implements OnInit {
    private actMonth:number;
    private prevMonth:number;
    private nextMonth:number;
    private monthNames:Month[];
    private products:Product[];
    private filterMenuOpen:boolean;

    constructor(private _productService: ProductService, private _router: Router, private _routeParams: RouteParams) {
        this.monthNames = MONTHS;
        this.filterMenuOpen = false;
    };
    
    ngOnInit():any {
        var month: any = this._routeParams.get('month');
        if (month == null) {
            month = new Date().getMonth();
            this._router.navigate(['SeasonCalendarMonth', {month: month}]);
        }
        this.setMonth(month);
        this.getProducts();
    }
    
    setMonth(month) {
        let monthNr = parseInt(month);
        if (monthNr >= 0 && monthNr <= 11) {
            this.actMonth = monthNr;
            this.prevMonth = (this.actMonth - 1 < 0) ? 11 : (this.actMonth - 1);
            this.nextMonth = (this.actMonth + 1) % 12;
        }
    }

    getProducts() {
        this._productService.getProductsOfMonth(this.actMonth)
            .subscribe(data => this.products = data);
    }

    goToProduct(product) {
        this._router.navigate(['/Products/ProductDetails', {id: product._id}]);
    }

    goToPrevMonth() {
        this._router.navigate(['/SeasonCalendar/SeasonCalendarMonth', {month: this.prevMonth}]);
    }

    goToNextMonth() {
        this._router.navigate(['/SeasonCalendar/SeasonCalendarMonth', {month: this.nextMonth}]);
    }

    toggleFilterMenu() {
        this.filterMenuOpen = !this.filterMenuOpen;
    }
}