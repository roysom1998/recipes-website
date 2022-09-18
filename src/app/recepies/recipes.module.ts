import {NgModule} from '@angular/core';

import { RecepiesComponent } from './recepies.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeItemsComponent } from './recipe-list/recipe-items/recipe-items.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { sharedModules } from '../shared/shared.module';
// a module can be used only within that module
// so we need to export the components which we have to use in some other modules.

@NgModule({
    declarations:[
        RecepiesComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemsComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports:[RouterModule,
        ReactiveFormsModule,
        // CommonModule,
        FormsModule,
        RecipesRoutingModule,
        sharedModules
    ]
    // exports:[
    //     RecepiesComponent,
    //     RecipeListComponent,
    //     RecipeDetailsComponent,
    //     RecipeItemsComponent,
    //     RecipeStartComponent,
    //     RecipeEditComponent
    // ]
})

export class RecipesModules{}