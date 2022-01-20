import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import {AdminDashboardService} from '../admin-dashboard.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-studyfields',
  templateUrl: './admin-studyfields.component.html',
  styleUrls: ['./admin-studyfields.component.css']
})
export class AdminStudyfieldsComponent implements OnInit {
  fields: any = []
  constructor(
    public dialog: MatDialog,
    private adminService: AdminDashboardService
  ) { }

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
  openAddField(){
    const dialogRef = this.dialog.open(FieldDialogAdd, {
      width: '700px',
      height: '200px',
      data: {}
    });
  }
}
@Component({
  selector:'dialog-add',
  templateUrl: './dialogs/dialog-add.html',
  styleUrls: ['./dialogs/dialog-add.css']
})
export class FieldDialogAdd{
  constructor(
    public dialogRef: MatDialogRef<FieldDialogAdd>,
    private adminService: AdminDashboardService,
    private router: Router
    ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  addField(field: NgForm) {
    this.adminService.addStudyField(field.value).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admindashboard/studyfields'])
      },
      (error: any) => {console.log(error)}
    );
  }

}
