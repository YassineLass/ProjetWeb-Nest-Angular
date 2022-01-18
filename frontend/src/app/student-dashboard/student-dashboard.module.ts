import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    AnnouncementsComponent,
    SubjectsComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StudentDashboardModule { }
