import { Injectable } from "angular2/core";
import { Http, Headers, Request, RequestOptions, RequestMethod } from "angular2/http";
import { Product } from "./product";
import {Category} from "./category/category";
import {Family} from "./family/family";
import "rxjs/add/operator/map";     // TODO remove this import when implemented in angular2


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


    getCategories() {
        return this._http.get('/api/products/categories')
            .map(response => response.json());
    }


    addProduct(product: Product) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            url: '/api/products/',
            body: JSON.stringify(product)
        });
        return this._http.request(new Request(options));
    }


    addFamily(family: Family) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            url: '/api/products/family/',
            body: JSON.stringify(family)
        });
        return this._http.request(new Request(options));
    }


    addCategory(category: Category) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var options = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            url: '/api/products/category/',
            body: JSON.stringify(category)
        });
        return this._http.request(new Request(options));
    }
}