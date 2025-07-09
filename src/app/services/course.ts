import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError, timeout } from 'rxjs';

export interface Course {
  id: number,
  name: string,
  description: string,
  duration: string,
  level: string,
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class CourseSevice {
  private http: HttpClient = inject(HttpClient);
  private baseUri: string = "http://localhost:8084/course";

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUri)
    .pipe(
      timeout(3000),
        catchError((error: HttpErrorResponse) => {
          console.error('Error al obtener los cursos:', error);
          return throwError(() => new Error('No se pudieron cargar los cursos. Intenta más tarde.'));
      })
    );
  }

  /* metodo para insertar un curso*/
  insertCourse(course:Course):Observable<void>{
    return this.http.post<void>(this.baseUri, course)
      .pipe(
      timeout(3000),
        catchError((error: HttpErrorResponse) => {
          console.error('Error al insertar un cursos:', error);
          return throwError(() => new Error('No se pudo salvar el cursos. Intenta más tarde.'));
      })
    );
  }

  /* metodo para eliminar un curso*/
  deleteCourse(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUri}/${id}`)
      .pipe(
      timeout(3000),
        catchError((error: HttpErrorResponse) => {
          console.error('Error al eliminar un cursos:', error);
          return throwError(() => new Error('No se pudo eliminar el cursos. Intenta más tarde.'));   
      })
    );
  }

  updateCourse(id: number, courseData: Course): Observable<void> {
  return this.http.put<void>(`${this.baseUri}/${id}`, courseData).pipe(
    timeout(3000),
    catchError((error: HttpErrorResponse) => {
      console.error('Error al actualizar el curso:', error);
      return throwError(() => new Error('No se pudo actualizar el curso. Intenta más tarde.'));
    })
  );
}

getCourseById(id: number): Observable<Course> {
  return this.http.get<Course>(`${this.baseUri}/${id}`).pipe(
    timeout(3000),
    catchError((error: HttpErrorResponse) => {
      console.error('Error al obtener el curso:', error);
      return throwError(() => new Error('No se pudo obtener el curso. Intenta más tarde.'));
    })
  );
}

}
