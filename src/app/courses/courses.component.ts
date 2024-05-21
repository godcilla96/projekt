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

  // paginering
  currentPage: number = 1;
  itemsPerPage: number = 50;
  totalPages: number = 1;
  totalFilteredCourses: number = 0; 
  startIndex: number = 1; 
  endIndex: number = 50; 

  constructor(private coursedataservice : CoursedataService) {}

  ngOnInit(): void {
    this.coursedataservice.getCourses().subscribe(data => {
      this.coursesList = data;
      this.subjects = [...new Set(this.coursesList.map(course => course.subject))];
      this.applyFilter();
    });
  }

sortData(key: keyof CoursesComponent) {
  if (this.sortKey === key) {
    this.sortAsc = !this.sortAsc;
  } else {
    this.sortKey = key;
    this.sortAsc = true;
  }
  this.applyFilter();
}

applyFilter() {
  const filtered = this.coursesList.filter(course => 
    (this.searchTerm === "" || 
     course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
     course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
    (this.selectedSubject === "" || course.subject === this.selectedSubject)
  );
  
  this.totalFilteredCourses = filtered.length;
  this.totalPages = Math.ceil(this.totalFilteredCourses / this.itemsPerPage);
  this.currentPage = 1;
  this.updateIndexes();
  this.filteredCoursesList = this.paginate(filtered);
}

paginate(courses: Courses[]): Courses[] {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return courses.slice(start, end);
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updateIndexes();
    this.filteredCoursesList = this.paginate(this.coursesList.filter(course => 
      (this.searchTerm === "" || 
       course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
       course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.selectedSubject === "" || course.subject === this.selectedSubject)
    ));
  }
}
updateIndexes() {
  this.startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
  this.endIndex = Math.min(this.currentPage * this.itemsPerPage, this.totalFilteredCourses);
}

saveToLocalStorage(course: Courses) {
  let savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
  if (!savedCourses.some((savedCourse: Courses) => savedCourse.courseCode === course.courseCode)) {
    savedCourses.push(course);
    localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
  }
}
}