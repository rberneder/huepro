import {Component} from "angular2/core";
import {OnInit} from "angular2/core";

@Component({
    selector: "popular-products",
    templateUrl: '/templates/popular-products/popular-products.template.html',
})
export class PopularProductsComponent implements OnInit {
    public loaded = false;
    
    ngOnInit():any {
        this.loaded = true;
        console.log('Popular-Products loaded');
    }
}