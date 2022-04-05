import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recepies/recipe.service';
import { Recipe } from '../recepies/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
@Injectable({providedIn:'root'})
export class DataStorageService{
constructor(private http:HttpClient,
    private recipeService:RecipeService,
    private authService:AuthService){}
storeRecipies() {
    const recipes=this.recipeService.getRecipe();
    this.http.
    put('https://my-angular-project-b392c-default-rtdb.firebaseio.com/recipes.json',recipes)
    .subscribe(response=>{
        console.log(response);
    })}
fetchRecipe(){
    //take() will take the user once and then unsubscribe.
    
        return this.http
        .get<Recipe[]>
         (
             'https://my-angular-project-b392c-default-rtdb.firebaseio.com/recipes.json'
         )
        .pipe(
        map(recipes=>{
            //the below map function is a javascript function
            return recipes.map(recipe=>{
                return {...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients :[] // if no ingredients is present then it will return an empty array
                };
            }   
            )
            }),
            tap(recipes=>{
            this.recipeService.setRecipes(recipes);
            }
            ));    
}
}