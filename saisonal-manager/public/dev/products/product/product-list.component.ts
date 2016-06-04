import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {ProductService} from "../product.service";
import {Product} from "../product";

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
    constructor (private _productService: ProductService) {}
    
    ngOnInit():any {
        this._productService.getProducts()
            .subscribe((products: Product[]) => this.products = products);
    }



    /*
     * ///////// HELPER METHODS /////////
     * */
    deleteProduct(product: Product) {
        if (confirm('Produkt löschen?')) {
            this._productService
                .deleteProduct(product._id)
                .subscribe((data) => {
                    this.products.splice(this.products.indexOf(product), 1);
                });
        }
    }

    editProduct(product: Product) {
        console.log('EDITING PRODUCT: ', product);
    }
}