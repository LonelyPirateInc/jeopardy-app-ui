import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  // public getAllTeams(): Observable<any> {
  //   return this.http
  //     .get(`http://127.0.0.1:3000/score/${teamId}`)
  //     .pipe(map(response => response['success'] ? response['payload'] : false))
  //     .pipe(catchError(err => {
  //       return throwError(err);
  //     }));
  // }
}
