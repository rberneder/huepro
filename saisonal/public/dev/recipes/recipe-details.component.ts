import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {OnInit} from "@angular/core";
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
        private _route: ActivatedRoute,
        private _recipeService: RecipeService) {
    }

    ngOnInit():any {
        this._route.params.subscribe(params => {
            let recipeId = params['id'];

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
        });

    }
}