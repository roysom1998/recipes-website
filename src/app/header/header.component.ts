import { Component, OnDestroy, OnInit} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service"
import { Subscription } from "rxjs";
@Component({
selector:"app-header",
templateUrl:"./header.component.html"
})
export class headerComponent implements OnInit,OnDestroy{
    private userSub!:Subscription;
    isAuthenticated=false;
    constructor(private dataStorageService:DataStorageService,
        private authService:AuthService){}
        ngOnInit(): void {
            this.userSub=this.authService.user.subscribe(user=>{
                this.isAuthenticated=!!user;//!user is true if user object is null
                console.log(!user);
                console.log(!!user);
            });
        }
    onSaveData(){
        this.dataStorageService.storeRecipies();
    }
    onFetchRecipe(){
        this.dataStorageService.fetchRecipe().subscribe(); // fetchrecipe function is use in dataStorage service for fetching datas from backend
    }
    onLogout(){
        this.authService.Logout();
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}