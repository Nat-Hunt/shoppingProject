import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { response } from "express";

@Injectable({
  providedIn: 'root'
})
export class RecipeService{
  databaseUrl: string = 'https://wdd430-shopping-project-default-rtdb.firebaseio.com/recipes.json';
  recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //   new Recipe('Cheeseburger', 
    //     'Burger with cheese on a sesame seed bun', 
    //     'https://upload.wikimedia.org/wikipedia/commons/b/bf/2019-02-28_21_43_08_A_Burger_King_cheeseburger_in_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg',
    //     [
    //       new Ingredient('Meat', 1),
    //       new Ingredient('Cheese', 1),
    //       new Ingredient('Bun', 1)
    //     ]),
    //   new Recipe('Pepperoni Pizza', 
    //     'The classic pizza', 
    //     'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pepperoni_pizza_%282%29.png', 
    //     [
    //       new Ingredient('Pepperoni', 1),
    //       new Ingredient('Mozzarella Cheese', 1),
    //       new Ingredient('Dough', 1),
    //       new Ingredient('Pizza Sauce', 1)
    //     ]),
    // ];
    private recipes: Recipe[] = [];

    constructor(
      private slService: ShoppingListService,
      private http: HttpClient
      ) {}

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }
  
    getRecipes() {
      // this.http
        // .get<Recipe[]>(this.databaseUrl)
      this.http.get<Recipe[]>('http://localhost:3000/api/recipes')
        .subscribe(
          (recipes: Recipe[]) => {
            this.recipes = recipes;
            this.recipesChanged.next(this.recipes.slice());
          }
        )
      return this.recipes.slice();
    }
  
    getRecipe(index: number) {
      return this.recipes[index];
    }
  
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
    }
  
    addRecipe(recipe: Recipe) {
      // this.http.get<Recipe[]>('http://localhost:3000/api/recipes')
      //   .subscribe(
      //     (recipes: Recipe[]) => {
      //       this.recipes = recipes;
      //       this.recipesChanged.next(this.recipes.slice());
      //     }
      //   )

      this.http
        .post<{message: string}>('http://localhost:3000/api/recipes', recipe)
        .subscribe((responseData)=> {
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
        });
    }
  
    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
  
    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}