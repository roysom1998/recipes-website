import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import {exhaustMap, take} from 'rxjs/operators';
@Injectable()
export class AuthInterseptor implements HttpInterceptor{
    constructor(private authService:AuthService){};
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.authService.user.subscribe();
        return this.authService.user.pipe(take(1),
        exhaustMap(user=>{
            if(!user){
                return next.handle(req);
            }
            const modified=req.clone({
                params:new HttpParams().set('auth',user.token!)
            });
            return next.handle(modified);
        }
        ))
        
    }
}