import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {OnInit} from "angular2/core";
import {ProductService} from "../products/product.service";
import {Product} from "../products/product";
import {MONTHS} from "../util/month.seed";

@Component({
    selector: "season-calendar",
    templateUrl: '/templates/season-calendar/season-calendar.template.html',
    providers: [ProductService],
})
export class SeasonCalendarComponent implements OnInit {
    private actMonth;
    private prevMonth;
    private nextMonth;
    private monthNames;
    private products: Product[];

    constructor(private _productService: ProductService, private _router: Router, private _routeParams: RouteParams) {
        this.setMonth(_routeParams.get('month'));
        this.monthNames = MONTHS;
    };
    
    ngOnInit():any {
        this.getContacts();
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

    getContacts() {
        this._productService.getProducts().then((products: Product[]) => this.products = products);
    }

    gotoPrevMonth() {
        this._router.navigate(['SeasonCalendar', {month: this.prevMonth}]);
    }

    gotoNextMonth() {
        this._router.navigate(['SeasonCalendar', {month: this.nextMonth}]);
    }

    testFunction(id) {
        console.log(this._productService.getProduct(id));
    }
}