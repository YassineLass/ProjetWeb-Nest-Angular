import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTING } from './app.routing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {LoginComponent} from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { SubjectsComponent } from './student-dashboard/subjects/subjects.component';
import { AnnouncementsComponent } from './student-dashboard/announcements/announcements.component';
import {LoginInterceptorProvider} from './shared/interceptors/login'
import { JwtHelperService } from '@auth0/angular-jwt';
import {RouterModule} from '@angular/router';
import {AdminDashboardModule} from './admin-dashboard/admin-dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    StudentDashboardComponent,
    AnnouncementsComponent,
    SubjectsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ROUTING,
    HttpClientModule,
    RouterModule,
    AdminDashboardModule,
    BrowserAnimationsModule,
    MatDialogModule,



  ],
  providers: [
    LoginInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
