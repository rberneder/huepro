import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {OnInit} from "angular2/core";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe";

@Component({
    templateUrl: '/templates/recipes/recipe-details.template.html',
    providers: [RecipeService]
})
export class RecipeDetailsComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private recipe: Recipe;

    

    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor(
        private _router: Router, 
        private _routerParams: RouteParams,
        private _recipeService: RecipeService) {
    }

    ngOnInit():any {
        let recipeId = this._routerParams.get('id');
        
        if (recipeId == null) {
            this._router.navigate(['Recipes']);
            return;
        }
        
        this._recipeService.getRecipe(recipeId)
            .subscribe(
                (recipe: Recipe) => {
                    this.recipe = recipe;

                    if (!this.recipe._id) this._router.navigate(['/Recipes/RecipeList']);
                }
            );
    }
}