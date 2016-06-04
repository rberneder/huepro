import {Component, OnInit} from "angular2/core";
import {ProductService} from "../products/product.service";

@Component({
    selector: "trend-product-ranking",
    templateUrl: '/templates/trend/trend-product-ranking.template.html',
    providers: [ProductService]
})
export class TrendProductRankingComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private productsTrend: any;
    private productsOverall: any;



    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor(private _productService: ProductService) {
        this.productsTrend = new Array();
        this.productsOverall = new Array();
    }

    ngOnInit():any {
        this._productService
            .getProductRanking()
            .subscribe((ranking) => {
                this.productsTrend = ranking;
                this.setUpProductsOverall();
            });
    }

    setUpProductsOverall() {
        for (let item of this.productsTrend) {
            this.productsOverall.push(item);
        }

        this.productsOverall.sort(function(a, b){
            if(a.overallPoints > b.overallPoints) return -1;
            if(a.overallPoints < b.overallPoints) return 1;
            return 0;
        });
    }
}