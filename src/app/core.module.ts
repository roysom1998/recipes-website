//this module is creted to not provide the provided in and make the app module cleaner.
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterseptor } from './auth/auth.interseptor.service';
import { NgModule } from "@angular/core";
import { ShoppinglistService } from './shopping-list/shopping-list.service';
import { RecipeService } from "./recepies/recipe.service";
@NgModule({
    providers:[
        ShoppinglistService,RecipeService,
        {provide:HTTP_INTERCEPTORS,
          useClass:AuthInterseptor,
          multi:true // to allow multiple interceptor
      }
    ]
})
export class coreModule{};