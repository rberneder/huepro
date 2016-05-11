import {Component, OnInit} from "angular2/core";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {Category} from "./category";

@Component({
	selector: "category-edit-form",
	inputs: ['category'],
	templateUrl: '/templates/products/category/category-edit-form.template.html',

})
export class CategoryEditFormComponent {
	category: Category;
	editCategoryForm: ControlGroup;

	constructor(private _formBuilder: FormBuilder){}

	onSubmit(value) {
		this._productService
			.updateCategory(value)
			.subscribe();
	}

	ngOnInit():any {
		this.editCategoryForm = this._formBuilder.group({
			'name': [this.category.name]
		});
	}
}