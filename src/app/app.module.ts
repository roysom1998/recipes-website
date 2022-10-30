import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { headerComponent } from './header/header.component';
// import { RecepiesComponent } from './recepies/recepies.component';
// import { RecipeListComponent } from './recepies/recipe-list/recipe-list.component';
// import { RecipeDetailsComponent } from './recepies/recipe-details/recipe-details.component';
// import { RecipeItemsComponent } from './recepies/recipe-list/recipe-items/recipe-items.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { RecipeStartComponent } from './recepies/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './recepies/recipe-edit/recipe-edit.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AuthComponent } from './auth/auth.components';
// import { LoadingSpinners } from './shared/loading-spinners/loading-spinners.components';
// import { AlertComponent } from './shared/alert/alert.component';
import { sharedModules } from './shared/shared.module';
// import { RecipesModules } from './recepies/recipes.module';
// import { shoppingListModules } from './shopping-list/shopping-list.module'
import { coreModule } from './core.module';
// import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
    // RecepiesComponent,
    // RecipeListComponent,
    // RecipeDetailsComponent,
    // RecipeItemsComponent,
    // RecipeStartComponent,
    // RecipeEditComponent,
    // AuthComponent
    // LoadingSpinners,
    // AlertComponent

  ],
  imports: [
    BrowserModule,
    // ReactiveFormsModule,
    // FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // RecipesModules,
    // AuthModule,
    // shoppingListModules,
    sharedModules,
    coreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
