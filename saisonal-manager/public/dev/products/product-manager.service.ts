import {Injectable} from "angular2/core";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/share";
import {Product} from "./product";
import {Family} from "./family/family";
import {Category} from "./category/category";

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
    private editFamilyObservable: Observable<Family>;
    private _editFamilyObserver: Observer<Family>;
    private addFamilyObservable: Observable<Family>;
    private _addFamilyObserver: Observer<Family>;
    private deleteFamilyObservable: Observable<Family>;
    private _deleteFamilyObserver: Observer<Family>;

    // //// CATEGORIES ////
    private editCategoryObservable: Observable<Category>;
    private _editCategoryObserver: Observer<Category>;
    private addCategoryObservable: Observable<Category>;
    private _addCategoryObserver: Observer<Category>;
    private deleteCategoryObservable: Observable<Category>;
    private _deleteCategoryObserver: Observer<Category>;



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
        // //// CATEGORIES ////
        this.editCategoryObservable = new Observable(observer => this._editCategoryObserver = observer).share();
        this.addCategoryObservable = new Observable(observer => this._addCategoryObserver = observer).share();
        this.deleteCategoryObservable = new Observable(observer => this._deleteCategoryObserver = observer).share();
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


    // //// CATEGORIES ////
    getEditCategory() {
        return this.editCategoryObservable;
    }

    setEditCategory(category: Category) {
        this._editCategoryObserver.next(category);
    }

    getAddCategory() {
        return this.addCategoryObservable;
    }

    setAddCategory(category: Category) {
        this._addCategoryObserver.next(category);
    }

    getDeleteCategory() {
        return this.deleteCategoryObservable;
    }

    setDeleteCategory(category: Category) {
        this._deleteCategoryObserver.next(category);
    }
}