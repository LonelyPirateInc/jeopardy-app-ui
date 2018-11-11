import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { RequestOptions, Request, Headers } from '@angular/http';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public createGame(name: string): Observable<any> {
    const game = {name};
    return this.http
      .post(`${this.hostAddress}:${this.endpointPort}/game/create`, { name })
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public resetGame(game: any): Observable<any> {
    return this.http
      .post(`${this.hostAddress}:${this.endpointPort}/game/toggle/${game.id}`, { isActive: false })
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public getRecentGame(): Observable<any> {
    return this.http
      .get(`${this.hostAddress}:${this.endpointPort}/game`)
      .pipe(map(response => response['success'] ? response['payload'] : false))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public getGameScoreByTeam(gameId: string, teamId: string): Observable<any> {
    return this.http
      .get(`${this.hostAddress}:${this.endpointPort}/game/${gameId}/${teamId}`)
      .pipe(map(response => response['success'] ? response['payload'] : false))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public getGameScores(gameId: string): Observable<any> {
    return this.http
      .get(`${this.hostAddress}:${this.endpointPort}/game/${gameId}/scores`)
      .pipe(map(response => response['success'] ? response['payload'] : false))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }
}
