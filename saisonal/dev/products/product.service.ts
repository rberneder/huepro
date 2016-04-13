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