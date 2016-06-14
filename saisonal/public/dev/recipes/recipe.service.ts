import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
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

    getRecipesWithProduct(product: Product) {
        return this._http.get("/api/recipes/")    // TODO append "with-product/ + product._id" to URL
            .map(response => response.json());
    }


}