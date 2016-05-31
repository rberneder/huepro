import { Injectable } from "angular2/core";
import { Http } from "angular2/http";
import "rxjs/add/operator/map";
import {ModusService} from "../util/modus.service"; // TODO remove this import when implemented in angular2

@Injectable()
export class ProductService {

    constructor(private _http: Http, private _modus: ModusService) {}


    /*
    * ////////// PRODUCTS //////////
    * */
    getProducts() {
        return this._http.get("/api/products/")
            .map(response => response.json());
    }

    getProduct(id) {
        let modus = this._modus.getModus();
        this._modus.resetModus();
        if (modus != '' && modus != 'search/') modus = '';
        return this._http.get("/api/products/id/" + modus + id)
            .map(response => response.json());
    }

    searchFor(str) {
        var strEsc = encodeURI(str);
        return this._http.get("/api/products/search/" + strEsc)
            .map(response => response.json());
    }

    getProductsOfMonth(month) {
        return this._http.get("/api/products/month/" + month)
            .map(response => response.json());
    }

    getFreshProducts() {
        return this._http.get("/api/products/fresh")
            .map(response => response.json());
    }
    
    
    
    /*
    * ////////// CATEGORIES //////////
    * */
    getCategories() {
        return this._http.get('/api/products/categories')
            .map(response => response.json());
    }
}