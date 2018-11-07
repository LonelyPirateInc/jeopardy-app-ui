import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public questionSelected = new Subject<any>();

  constructor(private http: HttpClient) { }

  public getQuestionCategories(): Observable<any> {
    return this.http
      .get(`http://127.0.0.1:3000/category`)
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }
}
