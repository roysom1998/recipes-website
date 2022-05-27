import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {headerComponent} from './header/header.component';
// import { RecepiesComponent } from './recepies/recepies.component';
// import { RecipeListComponent } from './recepies/recipe-list/recipe-list.component';
// import { RecipeDetailsComponent } from './recepies/recipe-details/recipe-details.component';
// import { RecipeItemsComponent } from './recepies/recipe-list/recipe-items/recipe-items.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppinglistService } from './shopping-list/shopping-list.service';
// import { RecipeStartComponent } from './recepies/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './recepies/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recepies/recipe.service';
import { AuthComponent } from './auth/auth.components';
import { LoadingSpinners } from './shared/loading-spinners/loading-spinners.components';
import { AuthInterseptor } from './auth/auth.interseptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipesModules } from './recepies/recipes.module';
@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
    // RecepiesComponent,
    // RecipeListComponent,
    // RecipeDetailsComponent,
    // RecipeItemsComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    // RecipeStartComponent,
    // RecipeEditComponent,
    AuthComponent,
    LoadingSpinners,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModules
  ],
  providers: [ShoppinglistService,RecipeService,
    {provide:HTTP_INTERCEPTORS,
      useClass:AuthInterseptor,
      multi:true // to allow multiple interceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
