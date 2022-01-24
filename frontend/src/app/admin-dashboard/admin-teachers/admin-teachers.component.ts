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
  teachers: any = []
  constructor(
    public dialog: MatDialog,
    private adminService: AdminDashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adminService.getAllTeachers().subscribe(
      (response: any) => {
        this.teachers = response
      },
      (error: any) => {
        this.teachers = []
      }
    )
  }
  openAddTeacher(){
    const dialogRef = this.dialog.open(DialogAddTeacher, {
      width: '700px',
      height: '400px',
      data: {}
    });
  }
  openEditTeacher(id: any){
    const dialogRef = this.dialog.open(DialogEditTeacher, {
      width: '700px',
      height: '400px',
      data: {id: id}
    });
  }
  deleteTeacher(id: any){
    this.adminService.deleteTeacher(id).subscribe(
      (response: any) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admindashboard/teachers'])
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}

@Component({
  selector:'dialog-add',
  templateUrl: './dialogs/dialog-add.html',
  styleUrls: ['./dialogs/dialog-add.css']
})
export class DialogAddTeacher implements OnInit{
  subjects: any = []
  ngOnInit(): void {
    this.adminService.getAllSubjects().subscribe(
      (response: any) => {
        this.subjects = response
      },
      (error: any) => {
        this.subjects = []
      }
    )
  }
  constructor(
    public dialogRef: MatDialogRef<DialogAddTeacher>,
    private adminService: AdminDashboardService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  addTeacher(subject: NgForm) {
    this.adminService.addTeacher(subject.value).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admindashboard/teachers'])
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
export class DialogEditTeacher implements OnInit{
  subjects: any = []
  ngOnInit(): void {
    this.adminService.getAllSubjects().subscribe(
      (response: any) => {
        this.subjects = response
      },
      (error: any) => {
        this.subjects = []
      }
    )
  }
  constructor(
    public dialogRef: MatDialogRef<DialogEditTeacher>,
    private adminService: AdminDashboardService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  editTeacher(teacher: NgForm){
    console.log(this.data)
    this.adminService.editTeacher(teacher.value, this.data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admindashboard/teachers'])
      },
      (error: any) => {
        console.log(error);
      }
    )
  }


}
