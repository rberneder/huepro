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
    private productsTrendGraphData: any;    // Holds x- and y-coordinates [percent]


    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor(private _productService: ProductService) {
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
        
        // Aiding function to evaluate unit for x-axis
        function getMinutesOfDateStr(dateStr) {
            return (typeof dateStr === 'undefined') ?
                typeof dateStr : (new Date(dateStr).getTime() / 1000 / 60);
        }
        
        // Getting global-range for axes
        var xMin, xMax, yMin, yMax;
        for (var trend of this.productsTrend) {
            var entries = trend.pointSnapshots.length;
            if (typeof xMin === 'undefined' || getMinutesOfDateStr(trend.pointSnapshotsTime[0]) < xMin) xMin = getMinutesOfDateStr(trend.pointSnapshotsTime[0]);
            if (typeof xMax === 'undefined' || getMinutesOfDateStr(trend.pointSnapshotsTime[entries - 1]) > xMax) xMax = getMinutesOfDateStr(trend.pointSnapshotsTime[entries - 1]);

            for (var point of trend.pointSnapshots) {
                if (typeof yMin === 'undefined' || point < yMin) yMin = point;
                if (typeof yMax === 'undefined' || point > yMax) yMax = point;
            }
        }

        // Generating point-coordinates
        for (let trend of this.productsTrend) {
            var points = '';

            for (var i = 0; i < trend.pointSnapshots.length; i++) {
                var xCoord = 100 * (getMinutesOfDateStr(trend.pointSnapshotsTime[i]) - xMin) / (xMax - xMin);
                var yCoord = 100 - 100 * (trend.pointSnapshots[i] - yMin) / (yMax - yMin);  // SVG has y on bottom
                points += xCoord + ',' + yCoord + ' ';
            }

            this.productsTrendGraphData[trend.product._id] = points;
        }
    }
}