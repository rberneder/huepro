import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {Family} from "../family/family";
import {ProductCl} from "../product.class";
import {Month} from "../../util/month";
import {MONTHS} from "../../util/month.seed";

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
	private newProduct: Product;
    private plant: number[];
    private harvest: number[];
    private families: Family[];
	private productAdded: boolean;
    private months: Month[];
    private dropZone: any;



    /*
     * ///////// INITIALIZATION /////////
     * */
	constructor (private _productService: ProductService, private _router: Router, private _formBuilder: FormBuilder) {
        this.productAdded = false;
        this.plant = new Array<number>();
        this.harvest = new Array<number>();
		this.newProduct = new ProductCl();
        this.months = MONTHS;
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
            this.newProduct.image = fileName;
        }
	}



    /*
     * ///////// FORM /////////
     * */
	onSubmit(value) {
       this._productService
			.addProduct(this.newProduct)
			.subscribe(data => {
				this.productAddSuccess();
				this.newProduct = new ProductCl();
                this.dropZone.removeAllFiles();
                this.plant.splice(0);
                this.harvest.splice(0);
                this.newProductForm
			});
	}

    calculateRange(type) {
        var start, end, months;
        switch (type) {
            case 'plant':
                start = this.newProduct.plantStartMonth;
                end = this.newProduct.plantEndMonth;
                months = this.plant;
                break;
            case 'harvest':
                start = this.newProduct.harvestStartMonth;
                end = this.newProduct.harvestEndMonth;
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
        if (this.newProduct.plantStartMonth === null) {
            this.newProduct.plantStartDay = day;
            this.newProduct.plantStartMonth = month;

        } else if (this.newProduct.plantEndMonth === null) {
            this.newProduct.plantEndDay = day;
            this.newProduct.plantEndMonth = month;

        } else {
            this.newProduct.plantStartDay = day;
            this.newProduct.plantStartMonth = month;
            this.newProduct.plantEndDay = null;
            this.newProduct.plantEndMonth = null;

        }
        this.calculateRange('plant');
    }

    updateHarvest(day: number, month: number) {
        if (this.newProduct.harvestStartMonth === null) {
            this.newProduct.harvestStartDay = day;
            this.newProduct.harvestStartMonth = month;

        } else if (this.newProduct.harvestEndMonth === null) {
            this.newProduct.harvestEndDay = day;
            this.newProduct.harvestEndMonth = month;

        } else {
            this.newProduct.harvestStartDay = day;
            this.newProduct.harvestStartMonth = month;
            this.newProduct.harvestEndDay = null;
            this.newProduct.harvestEndMonth = null;

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
		this.newProduct.category = foundFamily.category;
	}
    
    
    productAddSuccess() {
        this.productAdded = true;
        setTimeout(() => this.productAdded = false, 3000);
    }
}