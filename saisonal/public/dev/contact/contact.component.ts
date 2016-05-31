import {Component} from "angular2/core";
import {Router} from "angular2/router";

@Component({
    selector: "contact",
    templateUrl: '/templates/contact/contact.template.html'
})
export class ContactComponent {

    /*
     * ///////// INITIALIZATION / DESTRUCTION /////////
     * */
    constructor(private _router: Router) {}

}