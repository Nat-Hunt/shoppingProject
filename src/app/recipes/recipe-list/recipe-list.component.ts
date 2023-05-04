import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'just a test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
    new Recipe('Another Test Recipe', 'just a test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
  ];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipeDisplay(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
  constructor() {};

  ngOnInit() {};

}
