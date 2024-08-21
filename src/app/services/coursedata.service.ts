import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from '../model/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursedataService {

  //url till json-flien som innehåller kurserna

  private url:string = "assets/miun_courses.json";

  //httpclient för anrop
  constructor(private http: HttpClient) { }

  //funktion för att hämta in kurserna

  getCourses():Observable<Courses[]> {
    return this.http.get<Courses[]>(this.url);
  }
}