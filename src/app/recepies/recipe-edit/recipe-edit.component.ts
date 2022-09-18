import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
 id!:number;
 editMode=false;
 recipeForm!:UntypedFormGroup;
  constructor(private route:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=+params['id']; //converting id from string to number
        this.editMode=params['id'] != null;// if the id is not undefined
        this.initForm();
        console.log(this.editMode);
      }
    )
  }
  onsubmit(){
      const newRecipe=new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['imagepath'],
      this.recipeForm.value['description'],
      this.recipeForm.value['ingredients']);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe);
    }
    else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
    console.log(newRecipe);
  }
  onAddingredients(){
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(
      new UntypedFormGroup({
        'name':new UntypedFormControl(null,Validators.required),
        'amount':new UntypedFormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );//typecasting it to FormArray
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  get controls(){
    return(<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }
  onDeleteIngredients(index:number){
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);//removing the value at that particular index
  }
  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new UntypedFormArray([]);
    if(this.editMode)
    {
      const recipe=this.recipeService.getRecipes(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath; // assigned the value to  recipeImagePath
      recipeDescription=recipe.description;
      if(recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new UntypedFormGroup({
              'name':new UntypedFormControl(ingredient.name,Validators.required),
              'amount':new UntypedFormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            }
            )
          )
        }
      }
    }
    this.recipeForm=new UntypedFormGroup({
      'name':new UntypedFormControl(recipeName,Validators.required),
      'imagepath':new UntypedFormControl(recipeImagePath,Validators.required),
      'description':new UntypedFormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients // this is an ingredients array
    })
  }

}
