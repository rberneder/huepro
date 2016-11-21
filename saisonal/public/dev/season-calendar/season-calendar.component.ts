import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
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

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private selectedMonth:number;
    private actMonth:number;
    private prevMonth:number;
    private nextMonth:number;
    private monthNames:Month[];
    private products:Product[];
    private filterMenuOpen:boolean;



    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor(private _productService: ProductService, private _router: Router, private _route: ActivatedRoute) {
        this.actMonth = new Date().getMonth();
        this.monthNames = MONTHS;
        this.filterMenuOpen = false;
    };
    
    ngOnInit():any {
        this._route.params.subscribe(params => {
            var month: any = params['month'];
            if (month == null) {
                month = new Date().getMonth();
                this._router.navigate(['/saisonkalender', month]);
            }
            this.setMonth(month);
            this.getProducts();
        });
    }



    /*
     * ///////// HELPER FUNCTIONS /////////
     * */
    setMonth(month) {
        let monthNr = parseInt(month);
        if (monthNr >= 0 && monthNr <= 11) {
            this.selectedMonth = monthNr;
            this.prevMonth = (this.selectedMonth - 1 < 0) ? 11 : (this.selectedMonth - 1);
            this.nextMonth = (this.selectedMonth + 1) % 12;
        }
    }

    getProducts() {
        this._productService.getProductsOfMonth(this.selectedMonth)
            .subscribe(data => this.products = data);
    }

    goToProduct(product) {
        this._router.navigate(['/produkte/produkt', product._id]);
    }

    goToPrevMonth() {
        this._router.navigate(['/saisonkalender', this.prevMonth]);
    }

    goToNextMonth() {
        this._router.navigate(['/saisonkalender', this.nextMonth]);
    }

    toggleFilterMenu() {
        this.filterMenuOpen = !this.filterMenuOpen;
    }
}