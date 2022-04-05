import { Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import {Recipe} from "./recipe.model";
import { RecipeService } from "./recipe.service";
@Injectable({providedIn:'root'})
export class RecipesResolverService implements 
Resolve<Recipe[]>{
    constructor(private dataStorageService:DataStorageService,
                private recipeService:RecipeService){}// injecting RecipeService in this line
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipes=this.recipeService.getRecipe();
        if (recipes.length === 0){
            return this.dataStorageService.fetchRecipe();//resolver will subscribe it 
        }
        else{
            return recipes;
        }
        
    };
     
}