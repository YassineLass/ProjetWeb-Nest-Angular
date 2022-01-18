import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { SubjectsComponent } from './subjects/subjects.component';



@NgModule({
  declarations: [
    AnnouncementsComponent,
    SubjectsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class StudentDashboardModule { }
