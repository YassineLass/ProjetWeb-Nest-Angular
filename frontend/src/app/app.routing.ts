import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from './auth/login/login.component'
import {AppComponent} from './app.component'
const APP_ROUTES : Routes = [
  {path: '', component: LoginComponent},
];
export const ROUTING = RouterModule.forRoot(APP_ROUTES);
