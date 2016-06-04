import {Component, OnInit, Input} from "angular2/core";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";
import {ProductService} from "../product.service";
import {ProductManagerService} from "../product-manager.service";
import {Family} from "./family";
import {FamilyCl} from "./family.class";
import {Category} from "../category/category";

@Component({
	selector: "family-editor",
	templateUrl: '/templates/products/family/family-editor.template.html',
	providers: [ProductService]
})
export class FamilyEditorComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
	private newFamilyForm: ControlGroup;
	private editorFamily: Family;
    private familySaved: boolean;
    private isNewFamily: boolean;
    private categories: Category[];


    /*
     * ///////// INITIALIZATION /////////
     * */
	constructor (
        private _productService: ProductService,
        private _formBuilder: FormBuilder,
        private _productManagerService: ProductManagerService) {
        this.familySaved = false;
        this.isNewFamily = true;
        this.editorFamily = new FamilyCl();
	}

	ngOnInit():any {
        this._productManagerService
            .getEditFamily()
            .subscribe(family => {
                this.isNewFamily = false;
                this.editorFamily = family;
            });

		this._productService.getCategories()
			.subscribe(data => {
				this.categories = data;
			});

		this.newFamilyForm = this._formBuilder.group({
			'name': ['', Validators.required],
			'category': ['', Validators.required]
		});
	}



    /*
     * ///////// FORM /////////
     * */
    resetForm() {
        this.editorFamily = new FamilyCl();
        this.isNewFamily = true;
    }

	onSubmit(value) {
        if (this.isNewFamily) {
            this._productService
                .addFamily(this.editorFamily)
                .subscribe(response => {
                    this._productManagerService.setAddFamily(this.editorFamily);
                    this.saveSuccess();
                    this.resetForm();
                });

        } else {
            this._productService
                .updateFamily(this.editorFamily)
                .subscribe(data => {
                    this.saveSuccess();
                    this.resetForm();
                });
        }
	}

    deleteFamily() {
        if (confirm('Produktfamilie löschen?')) {
            this._productService
                .deleteFamily(this.editorFamily._id)
                .subscribe(data => {
                    this._productManagerService.setDeleteFamily(this.editorFamily);
                    this.resetForm();
                });
        }
    }

    saveSuccess() {
        this.familySaved = true;
        setTimeout(() => this.familySaved = false, 3000);
    }
}