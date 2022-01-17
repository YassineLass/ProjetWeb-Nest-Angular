import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private logIn: LoginService
  ) { }

  ngOnInit(): void {
  }
  doLogin(login: NgForm){
    this.logIn.doLogin(login.value).subscribe(
      (response: any) => {
        localStorage.setItem('token',response.token);
      },
      (error: any) => {
        console.log("error");
      }
    )
  }
}
