import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from './auth/login/login.component'
import {AppComponent} from './app.component'
import {StudentDashboardComponent} from './student-dashboard/student-dashboard.component'
const APP_ROUTES : Routes = [
  {path: '', component: LoginComponent},
  {path: 'profile', component: StudentDashboardComponent}
];
export const ROUTING = RouterModule.forRoot(APP_ROUTES);
