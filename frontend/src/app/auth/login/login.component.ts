import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  serverError: string = "";
  constructor(
    private logIn: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  doLogin(login: NgForm){
    this.logIn.doLogin(login.value).subscribe(
      (response: any) => {
        localStorage.setItem('access_token',response.access_token);
        const role = this.logIn.getRole();
        if(role=="admin"){
          this.router.navigate(['admindashboard'])
        }else{
          this.router.navigate(['studentdashboard'])
        }

      },
      (error: any) => {
        this.serverError = error.error.message;
      }
    )
  }
}
