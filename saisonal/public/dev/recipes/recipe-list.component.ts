import {Component, OnInit, HostListener, Directive} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ScrollService} from "../util/scroll/scroll.service";
import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipe";

@Component({
    selector: "recipe-list",
    templateUrl: '/templates/recipes/recipe-list.template.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [RecipeService]
})
export class RecipeListComponent implements OnInit  {


    /*
    * ///////// ATTRIBUTES /////////
    * */
    private recipes: Recipe[];
    private recipesSorted: Recipe[];
    private indices: any;
    private $recipes: any;
    private actMonth: number;



    /*
     * ///////// INITIALIZATION / DESTRUCTION /////////
     * */
    constructor(private _recipeService: RecipeService, private _scrollService: ScrollService) {
        this.recipesSorted = new Array();
        this.indices = new Array();
        this.actMonth = new Date().getMonth();
    }

    ngOnInit() {
        this._scrollService.subscribe(this.scroll);
        this._recipeService.getRecipes()
            .subscribe((recipes: Recipe[]) => {
                this.recipes = recipes;
                this.sortRecipes();
                setTimeout(() => this.scroll(null), 500);
            });
        this.$recipes = document.getElementById('product-list__cont').children; // TODO unify this with product-list-component
    }




    /*
     * ///////// SORT RECIPES /////////
     * */
    resetRecipeArrays() {
        while (this.recipesSorted.length) {
            this.recipesSorted.pop();
        }
        while (this.indices.length) {
            this.indices.pop();
        }
    }

    sortRecipes(sortCriteria = 'name asc') {
        switch (sortCriteria) {
            case 'name asc':
                this.recipes.sort(function(a, b){
                    if(a.name.toUpperCase() < b.name.toUpperCase()) return -1;
                    if(a.name.toUpperCase() > b.name.toUpperCase()) return 1;
                    return 0;
                });

                let letter = '';
                let count = 0;
                this.resetRecipeArrays();

                for (let recipe of this.recipes) {
                    let actLetter = recipe.name[0].toUpperCase();
                    if (actLetter !== letter) {
                        letter = actLetter;
                        this.indices.push({name: letter, selector: 'entry-' + count, active: false});   // TODO unify this with product-list-component
                    }
                    this.recipesSorted.push(recipe);
                    count++;
                }
                break;

            default:
                console.warn('Wrong recipe sort criteria.');
                break;
        }
    }



    /*
     * ///////// SCROLL /////////
     * */
    updateIndex(keyArr) {
        for (let i = 0; i < this.indices.length; i++) {
            this.indices[i].active = (keyArr.indexOf(this.indices[i].name[0].toUpperCase()) >= 0);
        }
    }

    scroll = (event) => {
        if (!this.$recipes || this.$recipes.length < 1) return;
        let scanBorder = window.scrollY + this.$recipes[0].offsetTop / 4;
        let height = 1.5 * this.$recipes[0].offsetHeight;
        let activeIndices = new Array();
        for (let i = 0; i < this.$recipes.length; i++) {
            let key = this.recipes[i].name[0].toUpperCase();
            if (this.$recipes[i].offsetTop >= scanBorder &&
                this.$recipes[i].offsetTop < (scanBorder + height) &&
                activeIndices.indexOf(key) < 0) {
                activeIndices.push(key);
            }
        }
        this.updateIndex(activeIndices);
    }

    scrollTo(event) {
        event.preventDefault();
        let id = event.target.getAttribute('href'),
            $element = document.getElementById(id);
        if ($element) {
            this._scrollService.scrollTo($element);
        }
    }
}