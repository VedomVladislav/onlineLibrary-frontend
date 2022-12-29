import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendAuthURI = environment.backendURL + '/auth';

  constructor(
    private httpClient: HttpClient
  ) {

   }

   public login(user: User): Observable<User> {
    return this.httpClient.post<User>(this.backendAuthURI + '/login', user);
   }

   public register(user: User): Observable<any> {
    console.log("User = " + JSON.stringify(user))
    return this.httpClient.put<any>(this.backendAuthURI + '/register', user);
   }

   public activateAccount(uuid: String): Observable<boolean> {
    return this.httpClient.post<boolean>(this.backendAuthURI + '/activate-account', uuid);
   }

   public resendActivateEmail(uuid: String): Observable<boolean> {
    return this.httpClient.post<boolean>(this.backendAuthURI + '/resend-activate-email', uuid);
   }

   public sendResetPassword(email: String): Observable<boolean> {
    return this.httpClient.post<boolean>(this.backendAuthURI + '/send-reset-password-email', email);
   }

   public updatePassword(password: string, token: string): Observable<boolean> {
    const tokenParam = new HttpParams().set('token', token);
    return this.httpClient.post<boolean>(this.backendAuthURI + '/update-password', password, {params: tokenParam});
   }
}

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: Array<Role>;
}

export class Role {
  name: string;
}
