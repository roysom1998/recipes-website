import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipe-resolver.service';
import { RecepiesComponent } from './recepies.component';
import { AuthGuard } from '../auth/auth.guard';
const routes:Routes=[
    {path:'',
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
  ]}
]
@NgModule({
imports:[RouterModule.forChild(routes)],
exports:[RouterModule]
})
export class RecipesRoutingModule{}