import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(
    private http: HttpClient
  ) { }

  fetchSubjects(){
    return this.http.get('http://localhost:3000/students');
  }
}
