import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAnnouncementComponent } from './admin-announcement/admin-announcement.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { DialogAdd } from './admin-students/admin-students.component';

import { AdminTeachersComponent } from './admin-teachers/admin-teachers.component';
import { AdminSubjectsComponent } from './admin-subjects/admin-subjects.component';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminAnnouncementComponent,
    AdminStudentsComponent,
    AdminTeachersComponent,
    AdminSubjectsComponent,
    DialogAdd
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class AdminDashboardModule { }
