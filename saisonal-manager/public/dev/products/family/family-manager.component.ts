import {Component} from "angular2/core";
import {FamilyEditorComponent} from "./family-editor.component";
import {FamilyListComponent} from "./family-list.component";


@Component({
    selector: "family-manager",
    templateUrl: '/templates/products/family/family-manager.template.html',
    directives: [FamilyEditorComponent, FamilyListComponent]
})
export class FamilyManagerComponent {
}