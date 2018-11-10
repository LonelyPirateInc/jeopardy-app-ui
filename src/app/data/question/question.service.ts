import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BuildEnvironment } from '../environmnet/build-environmnet';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public questionSelected = new Subject<any>();

  constructor(private http: HttpClient, private buildEnvironment: BuildEnvironment) { }

  public getQuestionCategories(): Observable<any> {
    return this.http
      .get(`${this.buildEnvironment.serviceHost}category`)
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public getQuestionById(questionId: string): Observable<any> {
    return this.http
      .get(`${this.buildEnvironment.serviceHost}question/${questionId}`)
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }
}
