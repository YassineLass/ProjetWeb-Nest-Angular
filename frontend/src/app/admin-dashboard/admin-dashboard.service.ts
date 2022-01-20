import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  api_link = 'http://localhost:3000/field';
  constructor(
    private http: HttpClient
  ) { }
  addStudyField(field: any){
    console.log(field);
    return this.http.post(this.api_link,field);
  }
  getAllStudyFields() {
    return this.http.get(this.api_link);
  }
  deleteField(id: any){
    return this.http.delete(this.api_link, id)
  }
}
