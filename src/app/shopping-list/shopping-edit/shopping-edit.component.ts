import { Component,  OnDestroy,  OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import { NgForm } from '@angular/forms';
import {Ingredient} from "../../shared/ingredients.model";
import { ShoppinglistService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm!:NgForm;
  subscription!:Subscription;
  editedItemIndex!:number;
  editMode=false;
  editedItem!:Ingredient;
  constructor(private shoplService:ShoppinglistService) { }

  ngOnInit(): void {
    this.subscription=this.shoplService.startedEditing
    .subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
        this.editMode=true; // we are editing 
        this.editedItem=this.shoplService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    );
  }
  onAddItem(form:NgForm){
    const value=form.value;// value is the property through which we are getting the value
    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editMode)
    {
      this.shoplService.updateIngredients(this.editedItemIndex,newIngredient);
    }
    else{
      this.shoplService.addingredient(newIngredient);
    } 
    this.editMode=false;
    form.reset();// clearing the content of the form feilds
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.shoplService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();// to avoid memory leak
  }
}
