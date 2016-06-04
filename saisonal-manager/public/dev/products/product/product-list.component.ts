import {Component, OnInit, Output, EventEmitter} from "angular2/core";
import {Router} from "angular2/router";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {ProductManagerService} from "../product-manager.service";

@Component({
    selector: "product-list",
    templateUrl: '/templates/products/product/product-list.template.html',
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private products: Product[];



    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor (
        private _productService: ProductService,
        private _productManagerService: ProductManagerService) {}
    
    ngOnInit():any {
        this._productService.getProducts()
            .subscribe((products: Product[]) => this.products = products);

        this._productManagerService
            .getDeleteProduct()
            .subscribe((product) => this.removeProductFromList(product));

        this._productManagerService
            .getAddProduct()
            .subscribe((product) => this.addProductToList(product));
    }



    /*
     * ///////// HELPER METHODS /////////
     * */
    deleteProduct(product: Product) {
        if (confirm('Produkt löschen?')) {
            this._productService
                .deleteProduct(product._id)
                .subscribe((data) => {
                    this.removeProductFromList(product);
                });
        }
    }

    addProductToList(product) {
        this.products.push(product);
    }

    removeProductFromList(product: Product) {
        this.products.splice(this.products.indexOf(product), 1);
    }

    editProduct(product: Product) {
        this._productManagerService.setEditProduct(product);
    }
}