import {Component, OnInit, Input} from "angular2/core";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {Family} from "../family/family";
import {ProductCl} from "./product.class";
import {Month} from "../../util/month";
import {MONTHS} from "../../util/month.seed";
import {ProductManagerService} from "../product-manager.service";

declare var Dropzone: any;

@Component({
	selector: "product-editor",
	templateUrl: '/templates/products/product/product-editor.template.html',
	providers: [ProductService, MONTHS]
})
export class ProductEditorComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
	private newProductForm: ControlGroup;
	private editorProduct: Product;
    private plant: number[];
    private harvest: number[];
    private families: Family[];
	private productSaved: boolean;
    private months: Month[];
    private dropZone: any;
    private isNewProduct: boolean;


    /*
     * ///////// INITIALIZATION /////////
     * */
	constructor (
        private _productService: ProductService,
        private _formBuilder: FormBuilder,
        private _productManagerService: ProductManagerService) {
        this.productSaved = false;
        this.isNewProduct = true;
        this.plant = new Array<number>();
        this.harvest = new Array<number>();
		this.editorProduct = new ProductCl();
        this.months = MONTHS;
	}

	ngOnInit():any {
		this.prepareUpload();

        this._productManagerService
            .getEditProduct()
            .subscribe(product => {
                this.isNewProduct = false;
                this.editorProduct = product;
                this.calculateRange('plant');
                this.calculateRange('harvest');
            });

		this._productService.getFamilies()
			.subscribe(data => {
				this.families = data;
			});

		this.newProductForm = this._formBuilder.group({
			'image': ['', Validators.required],
			'name': ['', Validators.required],
			'family': ['', Validators.required],
			'plantStartDay': ['', Validators.required],
            'plantStartMonth': ['', Validators.required],
			'plantEndDay': ['', Validators.required],
            'plantEndMonth': ['', Validators.required],
			'harvestStartDay': ['', Validators.required],
            'harvestStartMonth': ['', Validators.required],
			'harvestEndDay': ['', Validators.required],
            'harvestEndMonth': ['', Validators.required],
			'storageDays': ['', Validators.required],
			'shortDescription': [''],
			'description': ['', Validators.required]
		});
	}

	prepareUpload(): any {
		var form = document.getElementsByClassName('dropzone')[0];

		this.dropZone = new Dropzone(form, {
			maxFilesize: 3, // MB
			addRemovalLinks: false,
			acceptedFiles: 'image/*',
			dictDefaultMessage: 'Produktbild',
            uploadMultiple: false,
			thumbnailWidth: 400,
			thumbnailHeight: 300,
			init: function () {
				this.on('success', function(res) {
                    try {
                        let fileName = JSON.parse(res.xhr.response).file.name;
                        fileUploaded(fileName);
                    } catch(e) {
                        console.error('Unexpected server-response.');
                    }
				})
			}
		});

		var fileUploaded = (fileName) => {
            // Hack because this.newProductForm.controls.image.updateValue(...) doesn't exist anymore
            (<Control> this.newProductForm.find('image')).updateValue(fileName, {onlySelf:true, emitEvent:true});
            this.editorProduct.image = fileName;
        }
	}



    /*
     * ///////// FORM /////////
     * */
    resetForm() {
        this.editorProduct = new ProductCl();
        this.dropZone.removeAllFiles();
        this.plant.splice(0);
        this.harvest.splice(0);
        this.isNewProduct = true;
    }

	onSubmit(value) {
        if (this.isNewProduct) {
            this._productService
                .addProduct(this.editorProduct)
                .subscribe(response => {
                    this._productManagerService.setAddProduct(this.editorProduct);
                    this.productSaveSuccess();
                    this.resetForm();
                });

        } else {
            this._productService
                .updateProduct(this.editorProduct)
                .subscribe(data => {
                    this.productSaveSuccess();
                    this.resetForm();
                });
        }
	}

    deleteProduct() {
        if (confirm('Produkt löschen?')) {
            this._productService
                .deleteProduct(this.editorProduct._id)
                .subscribe(data => {
                    this._productManagerService.setDeleteProduct(this.editorProduct);
                    this.resetForm();
                });
        }
    }

    calculateRange(type) {
        var start, end, months;
        switch (type) {
            case 'plant':
                start = this.editorProduct.plantStartMonth;
                end = this.editorProduct.plantEndMonth;
                months = this.plant;
                break;
            case 'harvest':
                start = this.editorProduct.harvestStartMonth;
                end = this.editorProduct.harvestEndMonth;
                months = this.harvest;
                break;
        }
        months.splice(0);

        if (start !== null) {
            months.push(start);

            if (end !== null) {
                if (start > end) {
                    for (let i = start + 1; i < 12; i++) months.push(i);
                    for (let i = 0; i <= end; i++) months.push(i);
                } else {
                    for (let i = start + 1; i <= end; i++) months.push(i);
                }
            }
        }
    }

    updatePlant(day: number, month: number) {
        if (this.editorProduct.plantStartMonth === null) {
            this.editorProduct.plantStartDay = day;
            this.editorProduct.plantStartMonth = month;

        } else if (this.editorProduct.plantEndMonth === null) {
            this.editorProduct.plantEndDay = day;
            this.editorProduct.plantEndMonth = month;

        } else {
            this.editorProduct.plantStartDay = day;
            this.editorProduct.plantStartMonth = month;
            this.editorProduct.plantEndDay = null;
            this.editorProduct.plantEndMonth = null;

        }
        this.calculateRange('plant');
    }

    updateHarvest(day: number, month: number) {
        if (this.editorProduct.harvestStartMonth === null) {
            this.editorProduct.harvestStartDay = day;
            this.editorProduct.harvestStartMonth = month;

        } else if (this.editorProduct.harvestEndMonth === null) {
            this.editorProduct.harvestEndDay = day;
            this.editorProduct.harvestEndMonth = month;

        } else {
            this.editorProduct.harvestStartDay = day;
            this.editorProduct.harvestStartMonth = month;
            this.editorProduct.harvestEndDay = null;
            this.editorProduct.harvestEndMonth = null;

        }
        this.calculateRange('harvest');
    }



	updateCat(newFamilyName) {
        var foundFamily;
        for (let family of this.families) {
            if (family.name === newFamilyName) {
                foundFamily = family;
                break;
            }
        }
		this.editorProduct.category = foundFamily.category;
	}
    
    
    productSaveSuccess() {
        this.productSaved = true;
        setTimeout(() => this.productSaved = false, 3000);
    }
}