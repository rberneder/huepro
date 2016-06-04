import {Injectable} from "angular2/core";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/share";
import {Product} from "./product";
import {Family} from "./family/family";

export class ProductManagerService {
    
    /*
     * ///////// ATTRIBUTES /////////
     * */
    // //// PRODUCTS ////
    // Edit-product -> product that shall be edited
    private editProductObservable: Observable<Product>;
    private _editProductObserver: Observer<Product>;
    // Add-product -> product that shall be added
    private addProductObservable: Observable<Product>;
    private _addProductObserver: Observer<Product>;
    // Delete-product -> product that shall be deleted
    private deleteProductObservable: Observable<Product>;
    private _deleteProductObserver: Observer<Product>;

    // //// FAMILIES ////
    // Edit-product -> product that shall be edited
    private editFamilyObservable: Observable<Family>;
    private _editFamilyObserver: Observer<Family>;
    // Add-product -> product that shall be added
    private addFamilyObservable: Observable<Family>;
    private _addFamilyObserver: Observer<Family>;
    // Delete-product -> product that shall be deleted
    private deleteFamilyObservable: Observable<Family>;
    private _deleteFamilyObserver: Observer<Family>;




    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor() {
        // //// PRODUCTS ////
        this.editProductObservable = new Observable(observer => this._editProductObserver = observer).share();
        this.addProductObservable = new Observable(observer => this._addProductObserver = observer).share();
        this.deleteProductObservable = new Observable(observer => this._deleteProductObserver = observer).share();
        // //// FAMILIES ////
        this.editFamilyObservable = new Observable(observer => this._editFamilyObserver = observer).share();
        this.addFamilyObservable = new Observable(observer => this._addFamilyObserver = observer).share();
        this.deleteFamilyObservable = new Observable(observer => this._deleteFamilyObserver = observer).share();
    }



    /*
     * ///////// HELPERS /////////
     * */
    // //// PRODUCTS ////
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


    // //// FAMILIES ////
    getEditFamily() {
        return this.editFamilyObservable;
    }

    setEditFamily(family: Family) {
        this._editFamilyObserver.next(family);
    }

    getAddFamily() {
        return this.addFamilyObservable;
    }

    setAddFamily(family: Family) {
        this._addFamilyObserver.next(family);
    }

    getDeleteFamily() {
        return this.deleteFamilyObservable;
    }

    setDeleteFamily(family: Family) {
        this._deleteFamilyObserver.next(family);
    }
}