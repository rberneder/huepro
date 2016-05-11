import {Component, OnInit} from "angular2/core";
import {ProductService} from "../product.service";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {Category} from "./category";
import {CategoryEditFormComponent} from "./category-edit-form.component";

@Component({
	selector: "change-category",
	templateUrl: '/templates/products/category/change-category.template.html',
	providers: [ProductService],
	directives: [CategoryEditFormComponent]
})

export class ChangeCategoryComponent implements OnInit {
	categories:Category[];
	editing = false;

	constructor (private _productService: ProductService) {}

	delete(category) {
		this._productService
			.deleteCategory(category._id)
			.subscribe();

		var index = this.categories.indexOf(category);
		this.categories.splice(index, 1);
	}

	edit() {
		this.editing = true;
	}

	ngOnInit() {
		this._productService
			.getCategories()
			.subscribe(categories => this.categories = categories);
	}
}