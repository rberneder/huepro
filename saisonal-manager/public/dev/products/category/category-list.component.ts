import {Component, OnInit, Output, EventEmitter} from "angular2/core";
import {Router} from "angular2/router";
import {ProductService} from "../product.service";
import {ProductManagerService} from "../product-manager.service";
import {Category} from "./category";

@Component({
    selector: "category-list",
    templateUrl: '/templates/products/category/category-list.template.html',
    providers: [ProductService]
})
export class CategoryListComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private categories: Category[];



    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor (
        private _productService: ProductService,
        private _productManagerService: ProductManagerService) {}
    
    ngOnInit():any {
        this._productService.getCategories()
            .subscribe((categories: Category[]) => this.categories = categories);

        this._productManagerService
            .getDeleteCategory()
            .subscribe((category) => this.removeCategoryFromList(category));

        this._productManagerService
            .getAddCategory()
            .subscribe((category) => this.addCategoryToList(category));
    }



    /*
     * ///////// HELPER METHODS /////////
     * */
    deleteCategory(category: Category) {
        if (confirm('Produktkategorie löschen?')) {
            this._productService
                .deleteCategory(category._id)
                .subscribe((data) => {
                    this.removeCategoryFromList(category);
                });
        }
    }

    addCategoryToList(category: Category) {
        this.categories.push(category);
    }

    removeCategoryFromList(category: Category) {
        this.categories.splice(this.categories.indexOf(category), 1);
    }

    editCategory(category: Category) {
        this._productManagerService.setEditCategory(category);
    }
}