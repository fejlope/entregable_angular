import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Courses } from './components/courses/courses';
import { CoursesAdmin } from './components/courses-admin/courses-admin';
import { CourseForm } from './components/course-form/course-form';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'courses', component:Courses},
    {path:'coursesAdmin', component:CoursesAdmin},
    {path:'coursesadd', component:CourseForm}

];
