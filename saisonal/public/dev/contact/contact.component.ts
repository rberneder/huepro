import {Component} from "@angular/core";
import {Router} from "@angular/router";

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