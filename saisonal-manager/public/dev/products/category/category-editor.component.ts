import {Component, OnInit, Input} from "angular2/core";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";
import {ProductService} from "../product.service";
import {ProductManagerService} from "../product-manager.service";
import {Category} from "./category";
import {CategoryCl} from "./category.class";

@Component({
	selector: "category-editor",
	templateUrl: '/templates/products/category/category-editor.template.html',
	providers: [ProductService]
})
export class CategoryEditorComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
	private newCategoryForm: ControlGroup;
	private editorCategory: Category;
    private categorySaved: boolean;
    private isNewCategory: boolean;


    /*
     * ///////// INITIALIZATION /////////
     * */
	constructor (
        private _productService: ProductService,
        private _formBuilder: FormBuilder,
        private _productManagerService: ProductManagerService) {
        this.categorySaved = false;
        this.isNewCategory = true;
        this.editorCategory = new CategoryCl();
	}

	ngOnInit():any {
        this._productManagerService
            .getEditCategory()
            .subscribe(category => {
                this.isNewCategory = false;
                this.editorCategory = category;
            });

		this.newCategoryForm = this._formBuilder.group({
			'name': ['', Validators.required]
		});
	}



    /*
     * ///////// FORM /////////
     * */
    resetForm() {
        this.editorCategory = new CategoryCl();
        this.isNewCategory = true;
    }

	onSubmit(value) {
        if (this.isNewCategory) {
            this._productService
                .addCategory(this.editorCategory)
                .subscribe(response => {
                    this._productManagerService.setAddCategory(this.editorCategory);
                    this.saveSuccess();
                    this.resetForm();
                });

        } else {
            this._productService
                .updateCategory(this.editorCategory)
                .subscribe(data => {
                    this.saveSuccess();
                    this.resetForm();
                });
        }
	}

    deleteCategory() {
        if (confirm('Produktkategorie löschen?')) {
            this._productService
                .deleteFamily(this.editorCategory._id)
                .subscribe(data => {
                    this._productManagerService.setDeleteCategory(this.editorCategory);
                    this.resetForm();
                });
        }
    }

    saveSuccess() {
        this.categorySaved = true;
        setTimeout(() => this.categorySaved = false, 3000);
    }
}