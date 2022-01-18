import { Component, OnInit } from '@angular/core';
import {SubjectsService} from './subjects.service'
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects: any = []
  constructor(
    private subjectsService: SubjectsService,
  ) { }

  ngOnInit(): void {
    this.subjectsService.fetchSubjects().subscribe(
      (response: any) => {
        this.subjects = response;
      },
      (error: any) => {
        this.subjects = [
          'A','B','C'
        ]
      }
    );
  }

}
