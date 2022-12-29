import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    UPDATE_PASSWORD_URL = 'update-password';

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            withCredentials: true // allow cookies to be sent to backend
        });

        console.log(request);

        if (request.url.includes(this.UPDATE_PASSWORD_URL)) {
            const token = request.params.get('token');
            request.params.delete('token');

            request = request.clone({
                setHeaders: ({
                    Authorization: 'Bearer ' + token
                })
            });
        }
        return next.handle(request); //send request to backend
    }
}