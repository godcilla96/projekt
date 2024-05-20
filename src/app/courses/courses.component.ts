import { Component, OnInit, viewChild } from '@angular/core';
import { Courses } from '../model/courses';
import { CoursedataService } from '../services/coursedata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



//komponenten och dess metadata
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent implements OnInit {
  coursesList: Courses[] = [];
  filteredCoursesList: Courses[] = [];
  searchTerm: string = "";
  sortKey: string = "";
  sortAsc: boolean = true;
  subjects: string[] = [];
  selectedSubject: string = "";


  constructor(private coursedataservice : CoursedataService) {}

  ngOnInit(): void {
    this.coursedataservice.getCourses().subscribe(data => {
      this.coursesList = data;
      this.filteredCoursesList = [... this.coursesList];
      this.subjects = [...new Set(this.coursesList.map(course => course.subject))];
    });
  }

sortData(key: keyof CoursesComponent) {
  if (this.sortKey === key) {
    this.sortAsc = !this.sortAsc;
  } else {
    this.sortKey = key;
    this.sortAsc = true;
  }
}

applyFilter() {
  this.filteredCoursesList = this.coursesList.filter(course => 
    (this.searchTerm === "" || 
     course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
     course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
    (this.selectedSubject === "" || course.subject === this.selectedSubject)
  );
}

saveToLocalStorage(course: Courses) {
  let savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
  if (!savedCourses.some((savedCourse: Courses) => savedCourse.courseCode === course.courseCode)) {
    savedCourses.push(course);
    localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
  }
}
}