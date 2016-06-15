import {Component, OnInit} from "angular2/core";
import {ProductService} from "../products/product.service";
import {GraphService} from "../util/graph/graph.service";

@Component({
    selector: "trend-product-ranking",
    templateUrl: '/templates/trend/trend-product-ranking.template.html',
    providers: [ProductService, GraphService]
})
export class TrendProductRankingComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private productsTrend: any;
    private productsOverall: any;
    private productsTrendGraphData: any;    // Holds x- and y-coordinates [percent]


    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor(private _productService: ProductService, private _graphService: GraphService) {
        this.productsTrend = new Array();
        this.productsOverall = new Array();
        this.productsTrendGraphData = {};
    }

    ngOnInit():any {
        this._productService
            .getProductRanking()
            .subscribe((ranking) => {
                this.productsTrend = ranking;
                this.setUpProductsOverall();
                this.setUpTrendGraphData();
            });
    }

    setUpProductsOverall() {
        for (let item of this.productsTrend) {
            this.productsOverall.push(item);
        }

        this.productsOverall.sort(function(a, b){
            if(a.pointsTotal > b.pointsTotal) return -1;
            if(a.pointsTotal < b.pointsTotal) return 1;
            return 0;
        });
    }

    setUpTrendGraphData() {

        var dataSet = [];

        for (let trend of this.productsTrend) {
            dataSet.push({
                index: trend.product._id,
                values: trend.pointSnapshots,
                dates: trend.pointSnapshotsTime
            });
        }

        this.productsTrendGraphData = this._graphService.getSetOfSvgPolyLines(dataSet, 0);
    }
}