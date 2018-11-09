import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }


  public submitAnswers(answers: any[], questionId: string, gameId: string): Observable<any> {
    return this.http
      .post(`http://127.0.0.1:3000/game/play/${gameId}/${questionId}`, answers)
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }
}
