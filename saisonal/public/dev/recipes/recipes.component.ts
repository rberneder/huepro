import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

@Component({
    selector: "recipes",
    templateUrl: '/templates/recipes/recipes.template.html',
})
export class RecipesComponent implements OnInit {
    ngOnInit():any {
        console.log('Recipes loaded');
    }
}