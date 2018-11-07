import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { RequestOptions, Request, Headers } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  public createGame(name: string): Observable<any> {
    const game = {name};
    return this.http
      .post(`http://127.0.0.1:3000/game/create`, { name })
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }
}
