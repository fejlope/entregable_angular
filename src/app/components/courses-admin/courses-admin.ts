import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Course, CourseSevice } from '../../services/course';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-courses-admin',
  imports: [MatCardModule, MatButtonModule, MatGridListModule, MatIconModule, MatDialogModule, RouterModule],

  templateUrl: './courses-admin.html',
  styleUrl: './courses-admin.css'
})
export class CoursesAdmin {
  private service: CourseSevice = inject(CourseSevice);
  courses = signal<Course[]>([]);

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.service.getAllCourses().subscribe({
      next: values => { this.courses.set(values) },
      error: err => { console.log(err) }
    });
  }

  deleteCourse(id: number) {
    this.service.deleteCourse(id).subscribe({
      next: () => {
        this.getCourses();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
