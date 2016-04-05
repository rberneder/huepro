import {Component} from 'angular2/core';
import {MyComponentComponent} from "./my-component.component";

@Component({
    selector: 'app',
    template: `
        <h1>Angular 2 Boilerplate</h1>
        <p>Now comes the second compoenent</p>
        <my-component></my-component>
    `,
    directives: [MyComponentComponent]
})
export class AppComponent {

}
