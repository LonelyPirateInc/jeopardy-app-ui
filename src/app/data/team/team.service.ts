import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Observable, EMPTY, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  public createTeam(name: string): Observable<any> {
    console.log('name', name);
    return this.http
      .post(`http://192.168.2.62:3000/team/register`, { name })
      .pipe(map(response => response["payload"]))
      .pipe(catchError(err => {
          return throwError(err);
        }));
  }


  public getAllTeams(): Observable<any> {
    return this.http
      .get(`http://192.168.2.62:3000/team`)
      .pipe(map(response =>
          response["success"] ? response["payload"] : false
        ))
      .pipe(catchError(err => {
          return throwError(err);
        }));
  }



}
