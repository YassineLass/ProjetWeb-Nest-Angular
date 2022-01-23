import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import {AdminDashboardService} from '../admin-dashboard.service'
import { Router } from '@angular/router';
export interface DialogData {
  program_id: any;
}

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.css']
})
export class AdminTeachersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
