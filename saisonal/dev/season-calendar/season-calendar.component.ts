import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from "angular2/router";
import {ProductService} from "../products/product.service";
import {Product} from "../products/product";
import {MONTHS} from "../util/month.seed";
import {Month} from "../util/month";
import {ProductDetailsComponent} from "../products/product-details.component";

@Component({
    selector: "season-calendar",
    templateUrl: '/templates/season-calendar/season-calendar.template.html',
    providers: [ProductService],
    directives: [ROUTER_DIRECTIVES]
})
export class SeasonCalendarComponent implements OnInit {
    private actMonth:number;
    private prevMonth:number;
    private nextMonth:number;
    private monthNames:Month[];
    private products:Product[];
    private filterMenuOpen:boolean;
    
    private test = "";

    constructor(private _productService: ProductService, private _router: Router, private _routeParams: RouteParams) {
        this.setMonth(_routeParams.get('month'));
        this.monthNames = MONTHS;
        this.filterMenuOpen = false;
    };
    
    ngOnInit():any {
        this.getProducts();
        this.getTestDate();
    }
    
    setMonth(month) {
        let monthNr = parseInt(month);
        if (monthNr >= 0 && monthNr <= 11) {
            this.actMonth = monthNr;
            this.prevMonth = (this.actMonth - 1 < 0) ? 11 : (this.actMonth - 1);
            this.nextMonth = (this.actMonth + 1) % 12;
        } else {
            let actMonth = new Date().getMonth();
            console.warn('Invalid month param. Rerouting to month: ' + actMonth);
            this._router.navigate(['SeasonCalendar', {month: actMonth}]);
        }
    }

    getProducts() {
        this._productService.getProductsOfMonth(this.actMonth).then((products: Product[]) => this.products = products);
    }

    gotoPrevMonth() {
        this._router.navigate(['SeasonCalendar', {month: this.prevMonth}]);
    }

    gotoNextMonth() {
        this._router.navigate(['SeasonCalendar', {month: this.nextMonth}]);
    }

    toggleFilterMenu() {
        this.filterMenuOpen = !this.filterMenuOpen;
        console.log('CALL: ' + this.filterMenuOpen);
    }
    
    getTestDate() {
        this._productService.getTimeTest()
            .subscribe(
                data => this.test = JSON.stringify(data),
                error => console.warn('Nothing transmitted'),
                () => console.log('Loaded')
            );
    }
}