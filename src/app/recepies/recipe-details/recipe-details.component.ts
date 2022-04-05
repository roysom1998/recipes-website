import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
   recipe!:Recipe;
   id!:number;
  constructor(private recipeService: RecipeService,
              private route:ActivatedRoute,  // we are using this for fetching the id's
              private router:Router) 
              { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=+params['id']; // converting the id into text
        this.recipe=this.recipeService.getRecipes(this.id);// fetch the recipe with particular id
      }
    )
  }
  addToShoppingList(){
    this.recipeService.addIngredientsInShoppingList(this.recipe.ingredients);//passing ingredients in addIngredientsInShoppingList methods which is in recipe service
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});// this.route represents currently activated route
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipies']);// navigate to recipies component
  }
}
