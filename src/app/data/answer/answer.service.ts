import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }


  public submitAnswers(answers: any[], questionId: string, gameId: string, team: any): Observable<any> {
    const params = {
      answers,
      team
    };

    console.log(team);
    return this.http
      .post(`http://172.29.0.110:3000/game/play/${gameId}/${questionId}`, params)
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }
}
