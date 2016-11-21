import {Component} from "angular2/core";
import {Router} from "angular2/router";

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