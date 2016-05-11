import {Component, OnInit} from "angular2/core";
import {ProductService} from "../product.service";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {Family} from "./family";


@Component({
	selector: "change-family",
	templateUrl: '/templates/products/family/change-family.template.html',
	providers: [ProductService]
})

export class ChangeFamilyComponent implements OnInit {

	families:Family[];

	constructor (private _productService: ProductService) {}

	delete(family) {
		this._productService
			.deleteFamily(family._id)
			.subscribe();

		var index = this.families.indexOf(family);
		this.families.splice(index, 1);
	}

	ngOnInit() {
		this._productService
			.getFamilies()
			.subscribe(families => this.families = families);
	}
}