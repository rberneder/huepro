import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "imprint",
    templateUrl: '/templates/imprint/imprint.template.html'
})
export class ImprintComponent {

    /*
     * ///////// INITIALIZATION / DESTRUCTION /////////
     * */
    constructor(private _router: Router) {}

}