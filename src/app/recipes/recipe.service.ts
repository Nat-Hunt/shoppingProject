import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
      new Recipe('Cheeseburger', 
        'Burger with cheese on a sesame seed bun', 
        'https://upload.wikimedia.org/wikipedia/commons/b/bf/2019-02-28_21_43_08_A_Burger_King_cheeseburger_in_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg',
        [
          new Ingredient('Meat', 1),
          new Ingredient('Cheese', 1),
          new Ingredient('Bun', 1)
        ]),
      new Recipe('Pepperoni Pizza', 
        'The classic pizza', 
        'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pepperoni_pizza_%282%29.png', 
        [
          new Ingredient('Pepperoni', 1),
          new Ingredient('Mozzarella Cheese', 1),
          new Ingredient('Dough', 1),
          new Ingredient('Pizza Sauce', 1)
        ]),
    ];

    constructor(private slService: ShoppingListService){}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
      return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.onRecipesChanged();
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.onRecipesChanged();
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.onRecipesChanged();
    }

    private onRecipesChanged() {
      this.recipesChanged.next(this.recipes.slice());
  }
}