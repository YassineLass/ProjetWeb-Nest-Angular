import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  api_link = 'http://localhost:3000/user/login';
  jwtHelper = new JwtHelperService();


  constructor(
    private http: HttpClient
  ) { }
  doLogin(informations: any){
    return this.http.post(this.api_link,informations);
  }
  logout(){
    localStorage.removeItem('access_token');
  }
  isLoggedIn(){
    const token = localStorage.getItem('access_token');
    if(!!token){
      try{
        const state = !this.jwtHelper.isTokenExpired(token);
        return state;
      }
      catch (e){
        this.logout();
      }
    }
    return false;

  }
  getRole(){
    if(this.isLoggedIn()){
      const token:any = localStorage.getItem('access_token');
      const payload: any = decode(token);
      return payload.role;
    }
  }
}
