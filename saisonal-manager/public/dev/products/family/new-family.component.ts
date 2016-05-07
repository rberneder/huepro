import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {ProductService} from "../product.service";
import {Category} from "../category/category";

@Component({
    selector: "new-family",
    templateUrl: '/templates/products/family/new-family.template.html',
    providers: [ProductService]
})
export class NewFamilyComponent implements OnInit {
    newFamilyForm: ControlGroup;
    categories: Category[];
    familyAdded = false;

    constructor (private _productService: ProductService, private _router: Router, private _formBuilder: FormBuilder){}

    onSubmit(value) {
        this._productService
            .addFamily(value)
            .subscribe(data => {
                this.familyAdded = true;
            });
    }

    ngOnInit():any {
        this._productService.getCategories()
            .subscribe(data => {
                this.categories = data;
            });

        this.newFamilyForm = this._formBuilder.group({
            'name': ['', Validators.required],
            'category': ['', Validators.required]
        });
    }
}
