import {Injectable} from "angular2/core";
import {PRODUCTS} from "./mock-products";
import {Product} from "./product";

@Injectable()
export class ProductService {
    getProducts() {
        return Promise.resolve(PRODUCTS);
    }

    insertProduct(product: Product) {
        Promise.resolve(PRODUCTS).then((products: Product[])=>products.push(product));
    }
    
}