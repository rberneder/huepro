import { Injectable } from "angular2/core";
import { Http } from "angular2/http";
import { PRODUCTS } from "./mock-products";
import { Product } from "./product";
import "rxjs/add/operator/map"; // TODO remove this import when implemented in angular2

@Injectable()
export class ProductService {

    constructor(private _http: Http) {

    }

    getTimeTest() {
        return this._http.get('http://date.jsontest.com').map(res => res.json());
    }

    postJsonTest() {

    }

    getProducts() {
        return Promise.resolve(PRODUCTS);
    }


    getProduct(id) {
        let foundProduct = null;
        for (let product of PRODUCTS) {
            if (product._id === id) {
                foundProduct = product;
                break;
            }
        }
        return Promise.resolve(foundProduct);
    }


    getProductsOfMonth(month) {
        let foundProducts = [];
        for (let product of PRODUCTS) {
            if (product.harvestStart.month === month) {
                foundProducts.push(product);
            }
        }
        return Promise.resolve(foundProducts);
    }
    
    
    insertProduct(product: Product) {
        Promise.resolve(PRODUCTS).then((products: Product[]) => products.push(product));
    }
}