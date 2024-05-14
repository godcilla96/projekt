import { Component } from '@angular/core';
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

export class CoursesComponent {
  coursesList: Courses[] = [];
  filteredCoursesList: Courses[] = [];
  searchTerm: string = "";
  sortKey: string = "";
  sortAsc: boolean = true;

  constructor(private coursedataservice : CoursedataService) {}

  ngOnInit(): void {
    this.coursedataservice.getCourses().subscribe(data => {
      this.coursesList = data;
      this.filteredCoursesList = [... this.coursesList];
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
    course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
}