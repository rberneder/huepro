import {Component, OnInit} from "angular2/core";
import {ProductService} from "../product.service";
import {Router} from "angular2/router";
import {Family} from "./family";
import {Category} from "../category/category";

@Component({
	selector: "change-family",
	templateUrl: '/templates/products/family/change-family.template.html',
	providers: [ProductService]
})

export class ChangeFamilyComponent implements OnInit {

	families: Family[];
	editNr = -1;
	categories: Category[];
	family: Family;
	category: Category;

	constructor (private _productService: ProductService) {}

	delete(family) {
		this._productService
			.deleteFamily(family._id)
			.subscribe();

		var index = this.families.indexOf(family);
		this.families.splice(index, 1);
	}

	edit(i) {
		this.editNr = i;
	}

	stopEdit() {
		this.editNr = -1;
	}

	onSubmit(family: Family, name: string, category: string) {

		family.name = name;
		family.category = category;

		this._productService
			.updateFamily(family)
			.subscribe();
	}

	ngOnInit() {

		this._productService
			.getCategories()
			.subscribe(categories => this.categories = categories);

		this._productService
			.getFamilies()
			.subscribe(families => this.families = families);
	}
}