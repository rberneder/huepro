import {Injectable} from "angular2/core";
import {PRODUCTS} from "./mock-products";
import {Product} from "./product";

@Injectable()
export class ProductService {
    getProducts() {
        return Promise.resolve(PRODUCTS);
    }

    getProduct(id) {
        let foundProduct = null;

        for (let i = 0; i < PRODUCTS.length; i++) {
            if (PRODUCTS[i]._id === id) {
                foundProduct = PRODUCTS[i];
                break;
            }
        }

        return Promise.resolve(foundProduct);
    }

    insertContact(product: Product) {
        Promise.resolve(PRODUCTS).then((products: Product[]) => products.push(product));
    }
}