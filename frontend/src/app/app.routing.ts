import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from './auth/login/login.component'
import {AppComponent} from './app.component'
import {AnnouncementsComponent} from './student-dashboard/announcements/announcements.component'
import {SubjectsComponent} from './student-dashboard/subjects/subjects.component'
import {LoginGuard} from './shared/guards/login.guard';
import {AdminGuard} from './shared/guards/admin.guard';
import {AdminAnnouncementComponent} from './admin-dashboard/admin-announcement/admin-announcement.component'
import {AdminSubjectsComponent} from './admin-dashboard/admin-subjects/admin-subjects.component'
import {AdminStudentsComponent} from './admin-dashboard/admin-students/admin-students.component'
import {AdminTeachersComponent} from './admin-dashboard/admin-teachers/admin-teachers.component'
import {AdminStudyfieldsComponent} from './admin-dashboard/admin-studyfields/admin-studyfields.component'
const APP_ROUTES : Routes = [
  {path: '', component: LoginComponent},
  {path: 'studentdashboard',children: [
    {path: '', component: AnnouncementsComponent},
    {path: 'announcements', component: AnnouncementsComponent},
    {path: 'subjects', component: SubjectsComponent}
  ], canActivate: [LoginGuard]},
  {path: 'admindashboard', children: [
    {path: '', component: AdminAnnouncementComponent},
    {path: 'announcements', component: AdminAnnouncementComponent},
    {path: 'subjects', component: AdminSubjectsComponent},
    {path: 'teachers', component: AdminTeachersComponent},
    {path: 'students', component: AdminStudentsComponent},
    {path: 'studyfields', component: AdminStudyfieldsComponent}

  ], canActivate: [AdminGuard]}
];
export const ROUTING = RouterModule.forRoot(APP_ROUTES);
