import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { AuthComponent } from './auth/auth.components';
// import { RecipesModules } from './recepies/recipes.module';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'recipies',
    loadChildren: () => import('./recepies/recipes.module').then(m => m.RecipesModules)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.shoppingListModules)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
  // {path:'auth',component:AuthComponent},
  // {path:'shopping-list',component:ShoppingListComponent},
  //{path:'auth',component:AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
