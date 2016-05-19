import {Component, OnInit} from "angular2/core";
import {ProductService} from "../product.service";
import {Router} from "angular2/router";
import {Category} from "./category";

@Component({
	selector: "change-category",
	templateUrl: '/templates/products/category/change-category.template.html',
	providers: [ProductService]
})

export class ChangeCategoryComponent implements OnInit {
	categories:Category[];
	editNr = -1;
	category: Category;


	constructor (private _productService: ProductService) {}

	delete(category) {
		this._productService
			.deleteCategory(category._id)
			.subscribe();

		var index = this.categories.indexOf(category);
		this.categories.splice(index, 1);
	}

	edit(i) {
		this.editNr = i;
	}

	stopEdit() {
		this.editNr = -1;
	}

	onSubmit(category: Category, value: string) {
		category.name = value;

		this._productService
			.updateCategory(category)
			.subscribe();
	}

	ngOnInit() {
		this._productService
			.getCategories()
			.subscribe(categories => this.categories = categories);
	}
}