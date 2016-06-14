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
	private familiesProducts: any;



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
		this.familiesProducts = new Array();

		this._recipeService.getRecipes()
			.subscribe((recipes: Recipe[]) => this.recipes = recipes);


    };
	
    ngOnInit():any {

		this.prepareUpload();

		this._productService.getFamilies()
			.subscribe(data => {
				this.families = data;

				this._productService.getProducts()
					.subscribe(data => {
						this.products = data;

						this.getFamiliesProducts();
					});
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

	getFamiliesProducts(){
		for(let i = 0; i < this.families.length; i++) {
			this.familiesProducts[i] = this.families[i];
			for (let j = 0, k = 0; j < this.products.length; j++) {
				if(this.families[i].name == this.products[j].family) {
					this.familiesProducts[i][k] = this.products[j];
					k++;
				}
			}
		}
		console.log(this.familiesProducts);

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

	editRecipe(recipe: Recipe) {
		this.isNewRecipe = false;
		this.editorRecipe = recipe;
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
					this.addRecipeToList(this.editorRecipe);
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

	deleteEditRecipe() {
		this.deleteRecipe(this.editorRecipe);
		this.resetForm();
	}

	deleteRecipe(recipe: Recipe) {
		if (confirm('Rezept löschen?')) {
			this._recipeService
				.deleteRecipe(recipe._id)
				.subscribe((data) => {
					this.removeRecipeFromList(recipe);
				});
		}
	}

	addRecipeToList(recipe) {
		this.recipes.push(recipe);
	}

	removeRecipeFromList(recipe: Recipe) {
		this.recipes.splice(this.recipes.indexOf(recipe), 1);
	}

	recipeSaveSuccess() {
		this.recipeSaved = true;
		setTimeout(() => this.recipeSaved = false, 3000);
	}


}