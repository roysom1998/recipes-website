// import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { sharedModules } from "../shared/shared.module";
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports:[
        // CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path:'',component:ShoppingListComponent}
        ]),
        sharedModules
    ]
}
)

export class shoppingListModules{}