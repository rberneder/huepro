import {Component, OnInit} from "angular2/core";
import {ProductService} from "./product.service";
import {Product} from "./product";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";

@Component({
	selector: "newProduct",
	templateUrl: '/templates/products/new-product.template.html',
	providers: [ProductService]
})

export class NewProductComponent {

	newProductForm: ControlGroup;

	constructor (private _productService: ProductService, private _router: Router, private _formBuilder: FormBuilder){}

	onSubmit(value) {
		this._productService.insertProduct(value);
		this._router.navigate(['Products']);

	}

	ngOnInit():any {
		this.newProductForm = this._formBuilder.group({
			'id': [''],
			'name': ['', Validators.required],
			'family_id': ['', Validators.required],
			'plantStart': [''],
			'plantDays': [''],
			'harvestStart': [''],
			'harvestDays': [''],
			'storageDays': [''],
			'shortDescription': [''],
			'description': ['']
		});
	}
}