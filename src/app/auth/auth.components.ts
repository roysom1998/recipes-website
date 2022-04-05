import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService,AuthResponseData } from './auth.service';
import swal from 'sweetalert';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//import {AuthResponseData} from './auth.service'
@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{
    isLoggedin=true;
    isLoading=false;
    error: string=null!;

    constructor(private authService:AuthService,private router:Router){}
    onSwitch(){
        this.isLoggedin=!this.isLoggedin;//it will always opposite the value of isloggedin
        console.log(this.isLoggedin)
    }
    onSubmit(form:NgForm){
        if(!form.valid){
            return;
        }
        const email=form.value.email;
        const password=form.value.password;
        let authObs:Observable<AuthResponseData>;
        this.isLoading=true;//for showing the loader spinner
        if(this.isLoggedin)
        {
            // we have to ijmplement logic
            authObs=this.authService.Login(email,password);
        }
        else{
           //console.log(form.value);
           //in below code we subscribe the observale or response that we get
           authObs= this.authService.SignUp(email,password);
        }
        authObs.subscribe(
            resData=>{
                console.log(resData);
                this.isLoading=false;
                this.router.navigate(['/recipies']);
            },
            errorMessage=>{
                console.log(errorMessage);
                this.error=errorMessage;
                //swal("Oops!",this.error, "error");
                this.isLoading=false;//will not show loading image
            }
        ); 
        form.reset();
    }
    onHandleClose(){
        this.error=null!;
    }
}