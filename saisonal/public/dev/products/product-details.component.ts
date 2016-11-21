import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
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
        private _route: ActivatedRoute,
        private _productService: ProductService,
        private _recipeService: RecipeService) {
        this.monthNames = MONTHS;
    }

    ngOnInit():any {
        this._route.params.subscribe(params => {
            let productId = params['id'];

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
        });
        

    }
}