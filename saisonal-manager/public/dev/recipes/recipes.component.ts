import {Component, OnInit, Input} from "angular2/core";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";
import {RecipeService} from "./recipes.service";
import {Recipe} from "./recipe";
import {Family} from "../products/family/family";
import {Product} from "../products/product";
import {RecipeCl} from "./recipe.class";
import {ProductService} from "../products/product.service";

declare var Dropzone: any;

@Component({
    selector: "recipes",
    templateUrl: '/templates/recipes/recipes.template.html',
    providers: [RecipeService, ProductService]

})

export class RecipesComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private newRecipeForm: ControlGroup;
    private editorRecipe: Recipe;
    private families: Family[];
    private products: Product[];
    private recipeSaved: boolean;
    private dropZone: any;
    private isNewProduct: boolean;
    private recipes: Recipe[];
	private isNewRecipe: boolean;



    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor (
        private _recipeService: RecipeService,
		private _productService: ProductService,
        private _formBuilder: FormBuilder){
        
        this.recipeSaved=false;
        this.isNewRecipe=true;
        this.editorRecipe = new RecipeCl();

		this._recipeService.getRecipes()
			.subscribe((recipes: Recipe[]) => this.recipes = recipes);

    };
	
    ngOnInit():any {

		this.prepareUpload();

		this._productService.getFamilies()
			.subscribe(data => {
				this.families = data;
			});

		this._productService.getProducts()
			.subscribe(data => {
				this.products = data;
			});

		this.newRecipeForm = this._formBuilder.group({
			'image': ['', Validators.required],
			'name': ['', Validators.required],
			'ingredients': ['', Validators.required],
			'description': ['', Validators.required],
			'productFamilies': ['', Validators.required],
			'products': ['', Validators.required]
		});
    }

	prepareUpload(): any {
		var form = document.getElementsByClassName('dropzone')[0];

		this.dropZone = new Dropzone(form, {
			maxFilesize: 3, // MB
			addRemovalLinks: false,
			acceptedFiles: 'image/*',
			dictDefaultMessage: 'Rezeptbild',
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
			(<Control> this.newRecipeForm.find('image')).updateValue(fileName, {onlySelf:true, emitEvent:true});
			this.editorRecipe.image = fileName;
		}
	}

	/*
	 * ///////// FORM /////////
	 * */
	resetForm() {
		this.editorRecipe = new RecipeCl();
		this.dropZone.removeAllFiles();
		this.isNewRecipe = true;
	}

	onSubmit(value) {
		if (this.isNewRecipe) {
			this._recipeService
				.addRecipe(this.editorRecipe)
				.subscribe(response => {
					//this._productManagerService.setAddProduct(this.editorProduct);
					this.recipeSaveSuccess();
					this.resetForm();
				});

		} else {
			this._recipeService
				.updateRecipe(this.editorRecipe)
				.subscribe(data => {
					this.recipeSaveSuccess();
					this.resetForm();
				});
		}
	}

	deleteRecipe() {
		if (confirm('Rezept löschen?')) {
			this._recipeService
				.deleteRecipe(this.editorRecipe._id)
				.subscribe(data => {
					//this._productManagerService.setDeleteProduct(this.editorProduct);
					this.resetForm();
				});
		}
	}

	recipeSaveSuccess() {
		this.recipeSaved = true;
		setTimeout(() => this.recipeSaved = false, 3000);
	}


}