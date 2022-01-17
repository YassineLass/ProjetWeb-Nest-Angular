import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  api_link = 'http://localhost:3000/user/login';
  constructor(
    private http: HttpClient
  ) { }
  doLogin(informations: any){
    return this.http.post(this.api_link,informations);
  }
}
