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
  totalPoints: number = 0;

  ngOnInit(): void {
    const savedCoursesJson = localStorage.getItem('savedCourses');
    if(savedCoursesJson) {
      this.savedCourses = JSON.parse(savedCoursesJson);
      this.calculateTotalPoints();
    }
  }

  calculateTotalPoints(): void {
    this.totalPoints = this.savedCourses.reduce((sum, course) => sum + course.points, 0);
  }

  deleteCourse(courseCode: string): void {
    this.savedCourses = this.savedCourses.filter(course => course.courseCode !== courseCode);
    localStorage.setItem('savedCourses', JSON.stringify(this.savedCourses));
  }
  deleteAllCourses(): void {
    this.savedCourses = [];
    localStorage.removeItem('savedCourses');
  }
}
