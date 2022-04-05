import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError,tap} from 'rxjs/operators';
import {BehaviorSubject,Subject,throwError} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { getLocaleTimeFormat } from '@angular/common';
export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;// it is optional
}
@Injectable({providedIn:'root'})
export class AuthService{
   user=new BehaviorSubject<User>(null!);
   private tokenExpirationTimmer:any;
    //user=new Subject<User>();
    // token:string='null';
    constructor(private http:HttpClient,
                private router:Router){}
    SignUp(email:string,password:string){
        return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmSLZvkMGIQ0_Js0LLJ7xnqSuHO7snlVM',{
            email:email,
            password:password,
            returnSecureToken:true
         }).pipe(catchError(this.handleError),tap(resData=>{
            this.handleAuthentication(
                resData.email,
                resData.idToken,
                resData.localId,
                +resData.expiresIn)
        }));
    }
    Login(email:string,password:string){
        //we create an observable here
       return this.http.post<AuthResponseData>
       ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmSLZvkMGIQ0_Js0LLJ7xnqSuHO7snlVM',{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.handleError),tap(resData=>{
            this.handleAuthentication(
                resData.email,
                resData.idToken,
                resData.localId,
                +resData.expiresIn)
        }))
    }
    autoLogin(){
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        }
        =JSON.parse(localStorage.getItem('userData')!);//converting it back to javascript object
        if(!userData){
            return;
        }
        const loaduser=new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        )
        if(loaduser.token){
            this.user.next(loaduser);//setting the user with token as new user
            const expirationDuration=new Date(userData._tokenExpirationDate).getTime()
            -new Date().getTime();//getTime() converts into milliseconds
            this.autoLogout(expirationDuration);
        }
    }
    Logout(){
        this.user.next(null!);//changing the user to null
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimmer){
            clearTimeout(this.tokenExpirationTimmer);
        }
        else{
            this.tokenExpirationTimmer=null;
        }
    }
    autoLogout(expirationDuration:number){
        console.log(expirationDuration);
        setTimeout(()=>{
        this.tokenExpirationTimmer= this.Logout();
        },expirationDuration);
    }
    private handleAuthentication(email:string,
        token:string,
        userId:string,
        expiresIn:number){
        //converts time in date object form and not in milliseconds
        const expirationDate=new Date(new Date().getTime()+ expiresIn*1000)
        const user=new User(
            email,
            userId,
            token,
            expirationDate);
            //creating a new user
            this.user.next(user);
            this.autoLogout(expiresIn * 1000) //converting the time into milliseconds
            localStorage.setItem('userData',JSON.stringify(user));
    }
    private handleError(errorRes:HttpErrorResponse){
        let errorMessage="An error occured!";
                 if(!errorRes.error || !errorRes.error.error){
                    return throwError(errorMessage);
               }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage="This email already exists!";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage="Please enter correct email address";
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage="Please enter correct password";
                    break;
            }
            return throwError(errorMessage);
        }
}