import {Component, OnInit} from "angular2/core";
import {ProductService} from "./product.service";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {Family} from "./family/family";

@Component({
	selector: "new-product",
	templateUrl: '/templates/products/new-product.template.html',
	providers: [ProductService]
})
export class NewProductComponent implements OnInit {

	newProductForm: ControlGroup;
	families:Family[];
	productAdded = false;

	constructor (private _productService: ProductService, private _router: Router, private _formBuilder: FormBuilder){}

	onSubmit(value) {
		this._productService
			.addProduct(value)
			.subscribe(data => {
				this.productAdded = true;
			});
	}

	ngOnInit():any {
		this._productService.getFamilies()
			.subscribe(data => {
				this.families = data;
			});
		
		this.newProductForm = this._formBuilder.group({
			'name': ['', Validators.required],
			'family': ['', Validators.required],
			'category': [''], // TODO if [''] is filled --> invisible default value
			'plantStartMonth': [''],
			'plantStartDay': [''],
			'plantEndMonth': [''],
			'plantEndDay': [''],
			'harvestStartMonth': [''],
			'harvestStartDay': [''],
			'harvestEndMonth': [''],
			'harvestEndDay': [''],
			'storageDays': [''],
			'shortDescription': [''],
			'description': ['']
		});
	}
}