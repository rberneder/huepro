import {Component} from "angular2/core";
import {OnInit} from "angular2/core";

@Component({
    selector: "recipes",
    templateUrl: '/templates/recipes/recipes.template.html',
})
export class RecipesComponent implements OnInit {
    ngOnInit():any {
        console.log('Recipes loaded');
    }
}