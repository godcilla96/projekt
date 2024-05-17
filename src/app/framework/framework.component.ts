import { Component, OnInit } from '@angular/core';
import { Courses } from '../model/courses';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-framework',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './framework.component.html',
  styleUrl: './framework.component.scss'
})
export class FrameworkComponent implements OnInit {
  savedCourses: Courses[] = [];

  ngOnInit(): void {
    const savedCoursesJson = localStorage.getItem('savedCourses');
    if(savedCoursesJson) {
      this.savedCourses = JSON.parse(savedCoursesJson);
    }
  }

  deleteCourse(courseCode: string): void {
    this.savedCourses = this.savedCourses.filter(course => course.courseCode !== courseCode);
    localStorage.setItem('savedCourses', JSON.stringify(this.savedCourses));
  }
}
