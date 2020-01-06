import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }

    public token: string;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available

        this.token = this.userService.token;
        if (!this.token) {
            this.token = localStorage.getItem("token");
        }

        // console.log(token);
        if (this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
        }
        // Not logged in. Continue without modification.
        return next.handle(request);
    }
}