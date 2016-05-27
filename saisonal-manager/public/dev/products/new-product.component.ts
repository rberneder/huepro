import {Component, OnInit} from "angular2/core";
import {ProductService} from "./product.service";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {Family} from "./family/family";
import {Product} from "./product";
import {ProductCl} from "./product.class";

declare var Dropzone: any;

@Component({
	selector: "new-product",
	templateUrl: '/templates/products/new-product.template.html',
	providers: [ProductService]
})
export class NewProductComponent implements OnInit {

	private newProductForm: ControlGroup;
	private newProduct:Product;
	private families:Family[];
	private productAdded = false;
	private productImageUploaded = false;

	constructor (private _productService: ProductService, private _router: Router, private _formBuilder: FormBuilder) {
		this.newProduct = new ProductCl();
		this.newProduct.category = '-';
	}

	ngOnInit():any {
		this.prepareUpload();

		this._productService.getFamilies()
			.subscribe(data => {
				this.families = data;
			});

		this.newProductForm = this._formBuilder.group({
			'image': ['', Validators.required],
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

	prepareUpload(): any {
		var form = document.getElementsByClassName('dropzone')[0];

		var dropZone = new Dropzone(form, {
			maxFilesize: 3, // MB
			addRemovalLinks: false,
			acceptedFiles: 'image/*',
			dictDefaultMessage: 'Produktbild',
			init: function () {
				this.on('success', function() {
					fileUploaded();
				})
			}
		});

		var fileUploaded = () => this.productImageUploaded = true;
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
}