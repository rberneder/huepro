import {Component, OnInit, Output, EventEmitter} from "angular2/core";
import {Router} from "angular2/router";
import {ProductService} from "../product.service";
import {ProductManagerService} from "../product-manager.service";
import {Family} from "./family";

@Component({
    selector: "family-list",
    templateUrl: '/templates/products/family/family-list.template.html',
    providers: [ProductService]
})
export class FamilyListComponent implements OnInit {

    /*
     * ///////// ATTRIBUTES /////////
     * */
    private families: Family[];



    /*
     * ///////// INITIALIZATION /////////
     * */
    constructor (
        private _productService: ProductService,
        private _productManagerService: ProductManagerService) {}
    
    ngOnInit():any {
        this._productService.getFamilies()
            .subscribe((families: Family[]) => this.families = families);

        this._productManagerService
            .getDeleteFamily()
            .subscribe((family) => this.removeFamilyFromList(family));

        this._productManagerService
            .getAddFamily()
            .subscribe((family) => this.addFamilyToList(family));
    }



    /*
     * ///////// HELPER METHODS /////////
     * */
    deleteFamily(family: Family) {
        if (confirm('Produktfamilie löschen?')) {
            this._productService
                .deleteFamily(family._id)
                .subscribe((data) => {
                    this.removeFamilyFromList(family);
                });
        }
    }

    addFamilyToList(family: Family) {
        this.families.push(family);
    }

    removeFamilyFromList(family: Family) {
        this.families.splice(this.families.indexOf(family), 1);
    }

    editFamily(family: Family) {
        this._productManagerService.setEditFamily(family);
    }
}