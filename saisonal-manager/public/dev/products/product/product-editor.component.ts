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
        }
	}




    /*
     * ///////// FORM /////////
     * */
	onSubmit(value) {
        this.newProduct.image = value.image;
		this.newProduct.name = value.name;
		this.updateDateOf('plantStart', value.plantStart);
		this.updateDateOf('plantEnd', value.plantEnd);
		this.updateDateOf('harvestStart', value.harvestStart);
		this.updateDateOf('harvestEnd', value.harvestEnd);
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

    calculatePlantRange() {
        var start = this.newProduct.plantStartMonth;
        var end = this.newProduct.plantEndMonth;
        this.plant.splice(0);

        if (start && end) {
            if (start > end) {
                for (let i = start; i < 12; i++) this.plant.push(i);
                for (let i = 0; i <= end; i++) this.plant.push(i);
            } else {
                for (let i = start; i <= end; i++) this.plant.push(i);
            }
        }
    }

    updatePlantStart(day: number, month: number) {
        this.newProduct.plantStartDay = day;
        this.newProduct.plantStartMonth = (this.newProduct.plantStartMonth === month) ? null : month;
        this.calculatePlantRange();
    }

    updatePlantEnd(day: number, month: number) {
        this.newProduct.plantEndDay = day;
        this.newProduct.plantEndMonth = (this.newProduct.plantEndMonth === month) ? null : month;
        this.calculatePlantRange();
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