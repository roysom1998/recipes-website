import {Injectable } from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredients.model';
import {ShoppinglistService} from '../shopping-list/shopping-list.service';
import { Subject} from 'rxjs';
@Injectable()
export class RecipeService{
recipechanged=new Subject<Recipe[]>();//it is an event
  // private  recipes: Recipe[] = [
  //       new Recipe('New Recipe',
  //       'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
  //       'What Other Items Do You Want?',
  //       [
  //         new Ingredient("Chicken",2),
  //         new Ingredient("Cheese",1)
  //       ])
  //     ]
  private recipes : Recipe[] =[];// it will eftch datas from backend
      constructor(private shoplService:ShoppinglistService){

      }
      getRecipe(){
        return this.recipes.slice(); // a copy of recipies array is used here and return the array  
      }
      setRecipes(recipes:Recipe[]){
        this.recipes=recipes; // it will overwrite the recipes array
        this.recipechanged.next(this.recipes.slice());
      }
      getRecipes(index:number){
        return this.recipes[index]; // return the reciepe id
      }
      addIngredientsInShoppingList(ingredients:Ingredient[]){
        this.shoplService.addIngredients(ingredients);
      }
      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipechanged.next(this.recipes.slice())
      }
      updateRecipe(index:number,newRecipe:Recipe){
       this.recipes[index]=newRecipe;// assigning the vale of newRecipe at the array at index which is received in argument
       this.recipechanged.next(this.recipes.slice());
      }
      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipechanged.next(this.recipes.slice());
      }
}