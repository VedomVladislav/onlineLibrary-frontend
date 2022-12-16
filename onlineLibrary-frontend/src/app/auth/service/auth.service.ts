import { HttpClient } from '@angular/common/http';
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

   public login(request: User): Observable<User> {
    return this.httpClient.post<User>(this.backendAuthURI + '/login', request);
   }

   public register(request: User): Observable<any> {
    console.log("User = " + JSON.stringify(request))
    return this.httpClient.put<any>(this.backendAuthURI + '/register', request);
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
