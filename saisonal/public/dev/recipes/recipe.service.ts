import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Product} from "../products/product";

@Injectable()
export class RecipeService {

    /*
     * ////////// INITIALIZATION //////////
     * */
    constructor(private _http: Http) {}


    /*
    * ////////// REQUESTS //////////
    * */
    getRecipes() {
        return this._http.get("/api/recipes/")
            .map(response => response.json());
    }
    
    getRecipe(id: string) {
        return this._http.get("/api/recipes/id/" + id)
            .map(response => response.json());
    }

    getRecipesWithProduct(product: Product) {
        return this._http.get("/api/recipes/")    // TODO append "with-product/ + product._id" to URL
            .map(response => response.json());
    }


}