import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {OnInit} from "angular2/core";
import {ProductService} from "./product.service";
import {Product} from "./product";
import {Month} from "../util/month";
import {MONTHS} from "../util/month.seed";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe";

@Component({
    templateUrl: '/templates/products/product-details.template.html',
    providers: [ProductService, RecipeService]
})
export class ProductDetailsComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private product: Product;
    private monthNames: Month[];
    private recipes: Recipe[];

    

    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor(
        private _router: Router, 
        private _routerParams: RouteParams, 
        private _productService: ProductService,
        private _recipeService: RecipeService) {
        this.monthNames = MONTHS;
    }

    ngOnInit():any {
        let productId = this._routerParams.get('id');
        
        if (productId == null) {
            this._router.navigate(['Products', {month: new Date().getMonth()}]);
            return;
        }
        
        this._productService.getProduct(productId)
            .subscribe(
                (product:Product) => {
                    this.product = product;

                    if (!this.product._id) this._router.navigate(['/Products/ProductList']);

                    this._recipeService.getRecipesWithProduct(product)
                        .subscribe((recipes) => this.recipes = recipes);
                }
            );
    }
}