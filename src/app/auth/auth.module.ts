import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.components";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { sharedModules } from "../shared/shared.module";

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path:'',component:AuthComponent}]),
        sharedModules
    ]
})
export class AuthModule{};