import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { Course, CourseSevice } from '../../services/course';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { InfoModal } from '../info-modal/info-modal';

@Component({
  selector: 'app-courses',
  imports: [MatCardModule, MatButtonModule, MatGridListModule, MatIconModule, MatDialogModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {
  constructor(private dialog: MatDialog) {}

  private service: CourseSevice =inject(CourseSevice) ;
  courses=signal<Course[]>([]);

  ngOnInit(){
    this.getCourses();
  }

  getCourses(){
    this.service.getAllCourses().subscribe({
      next: values=>{this.courses.set(values)},
      error: err=>{console.log(err)}
    });
  }



 openInfoModal(): void {
    this.dialog.open(InfoModal);
  }
}
