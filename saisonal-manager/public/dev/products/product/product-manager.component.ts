import {Component} from "angular2/core";
import {ProductEditorComponent} from "./product-editor.component";
import {ProductListComponent} from "./product-list.component";


@Component({
    selector: "product-manager",
    templateUrl: '/templates/products/product/product-manager.template.html',
    directives: [ProductEditorComponent, ProductListComponent]
})
export class ProductManagerComponent {
}