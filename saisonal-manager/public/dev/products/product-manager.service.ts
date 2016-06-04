import {Injectable} from "angular2/core";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/share";
import {Product} from "./product";

export class ProductManagerService {
    
    /*
     * ///////// ATTRIBUTES /////////
     * */
    // Edit-product -> product that shall be edited
    private editProductObservable: Observable<Product>;
    private _editProductObserver: Observer<Product>;

    // Add-product -> product that shall be added
    private addProductObservable: Observable<Product>;
    private _addProductObserver: Observer<Product>;

    // Delete-product -> product that shall be deleted
    private deleteProductObservable: Observable<Product>;
    private _deleteProductObserver: Observer<Product>;



    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor() {
        this.editProductObservable = new Observable(observer => this._editProductObserver = observer).share();
        this.addProductObservable = new Observable(observer => this._addProductObserver = observer).share();
        this.deleteProductObservable = new Observable(observer => this._deleteProductObserver = observer).share();
    }



    /*
     * ///////// HELPERS /////////
     * */
    getEditProduct() {
        return this.editProductObservable;
    }

    setEditProduct(product: Product) {
        this._editProductObserver.next(product);
    }

    getAddProduct() {
        return this.addProductObservable;
    }

    setAddProduct(product: Product) {
        this._addProductObserver.next(product);
    }

    getDeleteProduct() {
        return this.deleteProductObservable;
    }

    setDeleteProduct(product: Product) {
        this._deleteProductObserver.next(product);
    }
}