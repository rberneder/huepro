import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {ProductService} from "../product.service";

@Component({
    selector: "new-category",
    templateUrl: '/templates/products/category/new-category.template.html',
    providers: [ProductService]
})
export class NewCategoryComponent implements OnInit {
    newCategoryForm: ControlGroup;
    categoryAdded = false;

    constructor (private _productService: ProductService, private _router: Router, private _formBuilder: FormBuilder){}

    onSubmit(value) {
        this._productService
            .addCategory(value)
            .subscribe(data => {
                this.categoryAdded = true;
            });
    }

    ngOnInit():any {
        this.newCategoryForm = this._formBuilder.group({
            'name': ['', Validators.required]
        });
    }
}