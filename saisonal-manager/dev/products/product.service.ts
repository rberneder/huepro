import {Injectable} from "angular2/core";
import {PRODUCTS} from "./mock-products";

@Injectable()
export class ProductService {
    getProducts() {
        return Promise.resolve(PRODUCTS);
    }
    
}