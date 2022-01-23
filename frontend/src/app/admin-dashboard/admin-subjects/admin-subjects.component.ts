import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AdminDashboardService} from '../admin-dashboard.service'
import { Router } from '@angular/router';

export interface DialogData {
  program_id: any;
}
@Component({
  selector: 'app-admin-subjects',
  templateUrl: './admin-subjects.component.html',
  styleUrls: ['./admin-subjects.component.css']
})
export class AdminSubjectsComponent implements OnInit {
  subjects: any = []
  constructor(
    public dialog: MatDialog,
    private adminService: AdminDashboardService,
    private router: Router
  ) { }

  ngOnInit(): void{
    this.adminService.getAllSubjects().subscribe(
      (response: any) => {
        console.log(response)
        this.subjects = response
      },
      (error: any) => {
        this.subjects = []
      }
    )

  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddSubject, {
      width: '700px',
      height: '500px',
      data: {}
    });
  }
  deleteSubject(id: any) {
    this.adminService.deleteSubject(id).subscribe(
      (response: any) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admindashboard/subjects'])
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
export class DialogAddSubject implements OnInit{
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
    public dialogRef: MatDialogRef<DialogAddSubject>,
    private adminService: AdminDashboardService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  addSubject(subject: NgForm) {
    this.adminService.addSubject(subject.value).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admindashboard/subjects'])
      },
      (error: any) => {
        console.log(error);
      }
    )
  }


}
