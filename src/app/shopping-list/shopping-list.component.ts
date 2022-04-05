import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredients.model';
import { ShoppinglistService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients!:Ingredient[];
  private igChangeSub!:Subscription; //property for storing the sucscription
  constructor(private shoplService:ShoppinglistService) { }

  ngOnInit():void {
    this.ingredients= this.shoplService.getIngredients();
    this.igChangeSub= this.shoplService.ingredientChanged
    .subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    )
  }
  onEditItem(index:number){
    this.shoplService.startedEditing.next(index); // we passed as a subject
  }
  ngOnDestroy(): void {
      this.igChangeSub.unsubscribe();
  }
}
