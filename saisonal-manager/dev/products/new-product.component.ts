import {Component} from "angular2/core";
import {ProductService} from "./product.service";
import {Product} from "./product";
import {Router} from "angular2/router";

@Component({
	selector: "newProduct",
	templateUrl: '/templates/products/new-product.template.html',
	providers: [ProductService]
})

export class NewProductComponent {

	newProduct: Product;

	constructor (private _productService: ProductService, private _router: Router){}

	onAddProduct(name, family_id, plantStart, plantDays, harvestStart, harvestDays, storageDays, shortDescription, description) {
		let product: Product = {name: name, family_id: family_id, plantStart: plantStart, plantDays: plantDays, harvestStart: harvestStart, harvestDays: harvestDays, storageDays: storageDays, shortDescription: shortDescription, description: description };
		this._productService.insertProduct(product);
		this._router.navigate(['Products']);

	}

	onSubmit() {
		this._productService.insertProduct(this.newProduct);
	}

	ngOnInit(): any {
		this.newProduct = {name: '', family_id: '', plantStart: '', plantDays: '', harvestStart: '', harvestDays: '', storageDays: '', shortDescription: '', description: '' };
	}
}