import { Injectable } from "angular2/core";
import { Http } from "angular2/http";
import { PRODUCTS } from "./mock-products";
import { Product } from "./product";
import "rxjs/add/operator/map"; // TODO remove this import when implemented in angular2


@Injectable()
export class ProductService {

    constructor(private _http: Http) {}


    getProducts() {
        return this._http.get("/api/products/")
            .map(response => response.json());
    }


    getProduct(id) {
        return this._http.get("/api/products/id/" + id)
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


    insertProduct(product: Product) {
        Promise.resolve(PRODUCTS).then((products: Product[]) => products.push(product));
    }
    
}