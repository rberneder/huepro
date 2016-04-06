import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Contact} from "./contact";

@Component({
    selector: "contact",
    template: `
        <div>
            First Name: <input [(ngModel)]="contact.firstName" type="text"/><br/>
            Last Name: <input [(ngModel)]="contact.lastName" type="text"/><br/>
            Phone: <input [(ngModel)]="contact.phone" type="text"/><br/>
            E-Mail: <input [(ngModel)]="contact.email" type="text"/><br/>
            <button (click)="onCreateNew()">Create new Contact from this Contact</button>
        </div>
    `,
    inputs: ["contact"],
})
export class ContactComponent {
    public contact: Contact = null;

    constructor(private _router: Router) {};

    onCreateNew() {
        this._router.navigate(['NewContact', {lastName: this.contact.lastName}]);
    }
}