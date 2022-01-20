import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import {AdminDashboardService} from '../admin-dashboard.service'

export interface DialogData {
  program_id: any;
}
@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  students: any = []
  constructor(
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAdd, {
      width: '700px',
      height: '500px',
      data: {}
    });
  }
}
@Component({
  selector:'dialog-add',
  templateUrl: './dialogs/dialog-add.html',
  styleUrls: ['./dialogs/dialog-add.css']
})
export class DialogAdd implements OnInit{
  fields = []
  ngOnInit(): void {
    this.adminService.getAllStudyFields().subscribe(
      (response: any) => {
        this.fields = response
      },
      (error: any) => {
        this.fields = []
      }
    )
  }
  constructor(
    public dialogRef: MatDialogRef<DialogAdd>,
    private adminService: AdminDashboardService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  addStudent(student: NgForm) {

  }

}
