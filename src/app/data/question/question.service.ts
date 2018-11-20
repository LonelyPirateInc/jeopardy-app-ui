import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService {
  public questionSelected = new Subject<any>();

  constructor(private http: HttpClient) {
    super();
  }

  public getQuestionCategories(): Observable<any> {
    return this.http
      .get(`${this.hostAddress}:${this.endpointPort}/category`)
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public getQuestionById(questionId: string): Observable<any> {
    return this.http
      .get(`${this.hostAddress}:${this.endpointPort}/question/${questionId}`)
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public toggleQuestion(question: any): Observable<any> {
    const params = { isActive: !question.isActive };
    return this.http
      .post(`${this.hostAddress}:${this.endpointPort}/question/toggle/${question.id}`, params)
      .pipe(map(response => response['success']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public getCurrentQuestion(): Observable<any> {
    return this.http
      .get(`${this.hostAddress}:${this.endpointPort}/question`)
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public updateQuestion(questionId: string, updatedQuestion): Observable<any> {
    return this.http
      .put(`${this.hostAddress}:${this.endpointPort}/question/${questionId}`, updatedQuestion)
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

}
