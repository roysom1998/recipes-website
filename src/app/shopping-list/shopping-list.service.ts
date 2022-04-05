import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

export class ShoppinglistService{
   ingredientChanged=new Subject<Ingredient[]>(); 
   startedEditing=new Subject<number>();
   private ingredients:Ingredient[]=[
        new Ingredient('Chicken',220),
        new Ingredient('Onion',40),
        new Ingredient('Garlic',80),
      ];
    getIngredients(){
        return this.ingredients.slice(); // we are using a copy of ingredients array
    }
    getIngredient(index:number){
        return this.ingredients[index];
    }
    addingredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        //subject use next to send a new value
        this.ingredientChanged.next(this.ingredients.slice());
    }
    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice()); // passing a copy of ingredients array
    }
    updateIngredients(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());// emitting the copy of ingredients
    }
    deleteIngredients(index:number){
        this.ingredients.splice(index,1) //it will start from index and move upto 1 item and remove it
        this.ingredientChanged.next(this.ingredients.slice());
    }
}