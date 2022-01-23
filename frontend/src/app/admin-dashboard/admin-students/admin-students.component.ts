import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import {AdminDashboardService} from '../admin-dashboard.service'
import { Router } from '@angular/router';

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
    private adminService: AdminDashboardService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.adminService.getAllStudents().subscribe(
      (response: any) => {
        this.students = response
      },
      (error: any) => {
        this.students = []
      }
    )
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAdd, {
      width: '700px',
      height: '500px',
      data: {}
    });
  }
  deleteStudent(id: any){
    this.adminService.deleteStudent(id).subscribe(
      (response: any) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admindashboard/students'])
      },
      (error: any) => {
        console.log(error.error.message)
      }
    )
  }
  editStudent(id: any) {
    const dialogRef = this.dialog.open(DialogEdit, {
      width: '700px',
      height: '500px',
      data: {id: id}
    });
  }
}
@Component({
  selector:'dialog-add',
  templateUrl: './dialogs/dialog-add.html',
  styleUrls: ['./dialogs/dialog-add.css']
})
export class DialogAdd implements OnInit{
  fields: any = []
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
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  addStudent(student: NgForm) {
    this.adminService.addStudent(student.value).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admindashboard/students'])
      },
      (error: any) => {
        console.log(error);
      }
    )
  }


}
@Component({
  selector:'dialog-edit',
  templateUrl: './dialogs/dialog-edit.html',
  styleUrls: ['./dialogs/dialog-edit.css']
})
export class DialogEdit implements OnInit{
  fields: any = []
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
    public dialogRef: MatDialogRef<DialogEdit>,
    private adminService: AdminDashboardService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  editStudent(student: NgForm){
    this.adminService.editStudent(student.value, this.data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admindashboard/students'])
      },
      (error: any) => {
        console.log(error);
      }
    )
  }


}
