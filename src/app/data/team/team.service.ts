import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Observable, EMPTY, throwError } from 'rxjs';
import { BuildEnvironment } from '../environmnet/build-environmnet';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient, private buildEnvironment: BuildEnvironment) { }

  public createTeam(name: string): Observable<any> {
    console.log('name', name);
    return this.http
      .post(`${this.buildEnvironment.serviceHost}team/register`, { name })
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }


  public getAllTeams(): Observable<any> {
    return this.http
      .get(`${this.buildEnvironment.serviceHost}team`)
      .pipe(map(response =>
          response["success"] ? response["payload"] : false
        ))
      .pipe(catchError(err => {
          return throwError(err);
        }));
  }



}
