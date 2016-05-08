import {Component, OnInit} from "angular2/core";
import {ProductService} from "./product.service";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {Family} from "./family/family";
import {Product} from "./product";
import {ProductCl} from "./product.class";

@Component({
	selector: "new-product",
	templateUrl: '/templates/products/new-product.template.html',
	providers: [ProductService]
})
export class NewProductComponent implements OnInit {

	newProductForm: ControlGroup;
	newProduct:Product;
	families:Family[];
	productAdded = false;

	constructor (private _productService: ProductService, private _router: Router, private _formBuilder: FormBuilder) {
		this.newProduct = new ProductCl();
		this.newProduct.category = '-';
	}

	onSubmit(value) {
		this.newProduct.name = value.name;
		this.updateDateOf('plantStart', value.plantStart);
		this.updateDateOf('plantEnd', value.plantEnd);
		this.updateDateOf('harvestStart', value.harvestStart);
		this.updateDateOf('harvestEnd', value.harvestEnd);
		this.updateDateOf('storag', value.storag);
		this.newProduct.storageDays = value.storageDays;
		this.newProduct.shortDescription = value.shortDescription;
		this.newProduct.description = value.description;

		this._productService
			.addProduct(this.newProduct)
			.subscribe(data => {
				this.productAdded = true;
				this.newProduct = new ProductCl();
				this.newProduct.category = '-';
			});
	}

	updateCat(famIndex) {
		var family = this.families[famIndex];
		this.newProduct.family = family.name;
		this.newProduct.category = family.category;
	}

	updateDateOf(entry, rawDate) {
		var plantDate = new Date(rawDate),
			month = plantDate.getMonth(),
			day = plantDate.getDate();

		switch (entry) {
			case 'plantStart':
				this.newProduct.plantStartMonth = month;
				this.newProduct.plantStartDay = day;
				break;
			case 'plantEnd':
				this.newProduct.plantEndMonth = month;
				this.newProduct.plantEndDay = day;
				break;
			case 'harvestStart':
				this.newProduct.harvestStartMonth = month;
				this.newProduct.harvestStartDay = day;
				break;
			case 'harvestEnd':
				this.newProduct.harvestEndMonth = month;
				this.newProduct.harvestEndDay = day;
				break;
		}
	}

	ngOnInit():any {
		this._productService.getFamilies()
			.subscribe(data => {
				this.families = data;
			});

		this.newProductForm = this._formBuilder.group({
			'name': ['', Validators.required],
			'family': ['', Validators.required],
			'plantStart': ['', Validators.required],
			'plantEnd': ['', Validators.required],
			'harvestStart': ['', Validators.required],
			'harvestEnd': ['', Validators.required],
			'storageDays': ['', Validators.required],
			'shortDescription': [''],
			'description': ['', Validators.required]
		});
	}
}