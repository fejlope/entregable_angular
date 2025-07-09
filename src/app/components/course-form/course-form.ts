import { Component, Inject, inject } from '@angular/core';
import { Course, CourseSevice } from '../../services/course';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-course-form',
  imports: [ ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, RouterModule, MatSelectModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css'
})
export class CourseForm {
  private service:CourseSevice=inject(CourseSevice);
  private build=inject(FormBuilder) ;
  private router=inject(Router);
  private route = inject(ActivatedRoute);

  niveles: string[] = ['Básico1', 'Medio1', 'Avanzado1'];
  editing = false;
  courseId!: number;

  form=this.build.group
  ({
    name: ['', [
      Validators.required, 
      Validators.maxLength(50)]],
    
    description: ['', [
      Validators.required, 
      Validators.maxLength(200)]],

    duration: ['', [
      Validators.required,  
      Validators.maxLength(100), 
      Validators.pattern(/^\d+$/)]],

    price: [ 0, [
      Validators.required, 
      Validators.pattern(/^\d+$/)]],

      level: ['', [
      Validators.required, 
      Validators.maxLength(500)]],


  });
    constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.courseId = +id;

      this.service.getCourseById(this.courseId).pipe(take(1)).subscribe({
        next: course => {
          this.form.patchValue(course);
        },
        error: err => console.error('Error cargando curso', err)
      });
    }
  }

  submit() {

     let name=this.form.controls.name.value!;
    let description=this.form.controls.description.value!;
    let duration=this.form.controls.duration.value!;
    let level=this.form.controls.level.value!;
    let price=this.form.controls.price.value!;

     let course:Course={
      id: 0,
      name: name,
      description: description,
      duration: duration,
      level: level,
      price: price

    
    }

    const obs = this.editing
      ? this.service.updateCourse(this.courseId, course)
      : this.service.insertCourse(course);

    obs.pipe(take(1)).subscribe({
      next: () => this.router.navigate(['courses']),
      error: err => console.error('Error guardando curso', err)
    });
  }
}
