import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepiesComponent } from './recepies/recepies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recepies/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './recepies/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recepies/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recepies/recipe-resolver.service';
import { AuthComponent } from './auth/auth.components';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {path:'',redirectTo:'/auth',pathMatch:'full'},
  {path:'auth',component:AuthComponent},
  {path:'recipies',
  component:RecepiesComponent,
  canActivate:[AuthGuard],
  children:[
    {path:'',component:RecipeStartComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',
    component:RecipeDetailsComponent,
    resolve:[RecipesResolverService]},
    {path:':id/edit',
    component:RecipeEditComponent,
    resolve:[RecipesResolverService]} // resolve key is an array of resolvers
  ]},
  {path:'shopping-list',component:ShoppingListComponent},
  //{path:'auth',component:AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
