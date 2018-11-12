import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public submitAnswers(answers: any[], questionId: string, gameId: string, team: any, isAllInQuestion: boolean): Observable<any> {
    const params = {
      answers,
      team,
      isAllInQuestion
    };
    return this.http
      .post(`${this.hostAddress}:${this.endpointPort}/game/play/${gameId}/${questionId}`, params)
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }
}
