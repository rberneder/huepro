import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {OnInit} from "angular2/core";
import {ContactService} from "./contact.service";
import {Contact} from "./contact";

@Component({
    template: `
        <form #myForm="ngForm" (ngSubmit)="onSubmit()">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name"
                ngControl="firstName"
                [(ngModel)]="newContact.firstName"
                required
            /><br/>
            
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name"
                ngControl="lastName"
                [(ngModel)]="newContact.lastName"
                required
            /><br/>
            
            <label for="phone">Phone:</label>
            <input type="text" id="phone"
                ngControl="phone"
                [(ngModel)]="newContact.phone"
                required
            /><br/>
            
            <label for="email">E-Mail:</label>
            <input type="text" id="email"
                ngControl="email"
                [(ngModel)]="newContact.email"
                required
            /><br/>
            
            <button type="submit" [disabled]="!myForm.form.valid">Create Contact</button>
        </form>
    `,
    providers: [ContactService]
})
export class NewContactComponent implements OnInit {

    newContact: Contact;

    constructor(private _contactService: ContactService, private _router: Router, private _routeParams: RouteParams) {}

    onSubmit() {
        this._contactService.insertContact(this.newContact);
        this._router.navigate(['Contacts']);
    }

    ngOnInit():any {
        this.newContact = {
            firstName: '',
            lastName: this._routeParams.get('lastName'),
            phone: '',
            email: ''
        };
    }
}