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
  //fields
  addStudyField(field: any){
    console.log(field);
    return this.http.post(this.api_link,field);
  }
  getAllStudyFields() {
    return this.http.get(this.api_link);
  }
  deleteField(id: any){
    return this.http.delete(this.api_link+'/'+id)
  }
  //students
  api_link1 = 'http://localhost:3000/user/register/student';
  addStudent(student: any){
    const info = {
      username: student.username,
      email:student.email,
      password:student.password,
      field_name:student.studyField,
      study_year:student.studyYear
    }
    console.log(info);
    return this.http.post(this.api_link1, info)
  }
  api_link2 = 'http://localhost:3000/students/all';
  getAllStudents(){
    return this.http.get(this.api_link2);
  }
  api_link3 = 'http://localhost:3000/control/student/'
  editStudent(student: any,id: any){
    const info = {
      username: student.username,
      email:student.email,
      password:student.password,
      field_name:student.studyField,
      study_year:student.studyYear
    }
    console.log(info);
    return this.http.patch(this.api_link3+id.id, info)
  }
  deleteStudent(id: any) {
    return this.http.delete(this.api_link3+id)
  }
  //Subjects
  api_link4 = 'http://localhost:3000/subject'
  addSubject(infos: any){
    console.log(infos)
    return this.http.post(this.api_link4, infos)
  }
  deleteSubject(id: any){
    return this.http.delete(this.api_link4+"/"+id)
  }
  api_link5 = 'http://localhost:3000/subject/all'
  getAllSubjects(){
    return this.http.get(this.api_link5)
  }
  //Teachers
  api_link6 = 'http://localhost:3000/teachers'
  getAllTeachers(){
    return this.http.get(this.api_link6)
  }
  api_link7 = 'http://localhost:3000/user/register/teacher'
  addTeacher(infos: any){
    return this.http.post(this.api_link7, infos)
  }
  api_link8 = 'http://localhost:3000/control/teacher/'
  deleteTeacher(id: any){
    return this.http.delete(this.api_link8+id)
  }
  editTeacher(infos: any, id: any){
    const link = this.api_link8+id.id
    return this.http.patch(link, infos)
  }
}
