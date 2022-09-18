import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import {LoadingSpinners} from "./loading-spinners/loading-spinners.components"
@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinners
    ],
    imports:[
        CommonModule
    ],
    exports:[
        AlertComponent,
        LoadingSpinners,
        CommonModule
    ]
})
export class sharedModules{};