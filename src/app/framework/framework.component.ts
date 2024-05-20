import { Component, OnInit } from '@angular/core';
import { Courses } from '../model/courses';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-framework',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {
  savedCourses: Courses[] = [];
  totalPoints: number = 0;

  ngOnInit(): void {
    this.loadSavedCourses();
  }

  loadSavedCourses(): void {
    const savedCoursesJson = localStorage.getItem('savedCourses');
    if (savedCoursesJson) {
      this.savedCourses = JSON.parse(savedCoursesJson);
      this.calculateTotalPoints();
    } else {
      this.savedCourses = [];
      this.totalPoints = 0;
    }
  }

  calculateTotalPoints(): void {
    this.totalPoints = this.savedCourses.reduce((sum, course) => sum + course.points, 0);
  }

  saveToLocalStorage(course: Courses): void {
    let savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
    if (!savedCourses.some((savedCourse: Courses) => savedCourse.courseCode === course.courseCode)) {
      savedCourses.push(course);
      localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
      this.loadSavedCourses();
    }
  }

  deleteCourse(courseCode: string): void {
    this.savedCourses = this.savedCourses.filter(course => course.courseCode !== courseCode);
    localStorage.setItem('savedCourses', JSON.stringify(this.savedCourses));
    this.loadSavedCourses(); //laddar om poängen när en kurs tas bort
  }

  deleteAllCourses(): void {
    this.savedCourses = [];
    localStorage.removeItem('savedCourses');
    this.totalPoints = 0;
  }
}