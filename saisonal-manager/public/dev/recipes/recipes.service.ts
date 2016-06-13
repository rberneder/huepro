import { Injectable } from "angular2/core";
import { Http, Headers, Request, RequestOptions, RequestMethod } from "angular2/http";
import { Recipe } from "./recipe";
//import { Product } from "./product";
import "rxjs/add/operator/map";


@Injectable()
export class RecipeService {

	constructor(private _http: Http) {}

	getRecipes() {
		return this._http.get("/api/recipes/")
			.map(response => response.json());
	}

	getRecipe(id) {
		return this._http.get("/api/recipes/id/" + id)
			.map(response => response.json());
	}

	deleteRecipe(id) {
		return this._http.delete("api/recipes/id/" + id)
			.map(response => response.json());
	}

	updateRecipe(recipe) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		var options = new RequestOptions({
			method: RequestMethod.Put,
			headers: headers,
			url: '/api/recipes/id/' + recipe._id,
			body: JSON.stringify(recipe)
		});
		return this._http.request(new Request(options));
	}

	addRecipe(recipe: Recipe) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		var options = new RequestOptions({
			method: RequestMethod.Post,
			headers: headers,
			url: '/api/recipes/',
			body: JSON.stringify(recipe)
		});
		return this._http.request(new Request(options));
	}
}