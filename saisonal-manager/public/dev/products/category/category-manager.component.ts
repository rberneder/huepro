import {Component} from "angular2/core";
import {CategoryListComponent} from "./category-list.component";
import {CategoryEditorComponent} from "./category-editor.component";


@Component({
    selector: "category-manager",
    templateUrl: '/templates/products/category/category-manager.template.html',
    directives: [CategoryEditorComponent, CategoryListComponent]
})
export class CategoryManagerComponent {
}