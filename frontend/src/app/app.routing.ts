import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from './auth/login/login.component'
import {AppComponent} from './app.component'
import {AnnouncementsComponent} from './student-dashboard/announcements/announcements.component'
import {SubjectsComponent} from './student-dashboard/subjects/subjects.component'

import {LoginGuard} from './shared/guards/login.guard';
const APP_ROUTES : Routes = [
  {path: '', component: LoginComponent},
  {path: 'studentdashboard',children: [
    {path: '', component: AnnouncementsComponent},
    {path: 'announcements', component: AnnouncementsComponent},
    {path: 'subjects', component: SubjectsComponent}
  ], canActivate: [LoginGuard]}
];
export const ROUTING = RouterModule.forRoot(APP_ROUTES);
