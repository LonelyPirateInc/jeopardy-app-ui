import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BuildEnvironment } from '../environmnet/build-environmnet';
import { RequestOptions, Request, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient, private buildEnvironment: BuildEnvironment) { }

  public createGame(name: string): Observable<any> {
    const game = {name};
    return this.http
      .post(`${this.buildEnvironment.serviceHost}game/create`, { name })
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public getRecentGame(): Observable<any> {
    return this.http
      .get(`${this.buildEnvironment.serviceHost}game`)
      .pipe(map(response => response['success'] ? response['payload'] : false))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public getGameScoreByTeam(gameId: string, teamId: string): Observable<any> {
    return this.http
      .get(`${this.buildEnvironment.serviceHost}game/${gameId}/${teamId}`)
      .pipe(map(response => response['success'] ? response['payload'] : false))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }
}
