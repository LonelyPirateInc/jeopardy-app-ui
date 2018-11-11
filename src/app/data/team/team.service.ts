import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Observable, EMPTY, throwError } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public createTeam(name: string): Observable<any> {
    console.log('name', name);
    return this.http
      .post(`${this.hostAddress}:${this.endpointPort}/team/register`, { name })
      .pipe(map(response => response['payload']))
      .pipe(catchError(err => {
          return throwError(err);
        }));
  }


  public getAllTeams(): Observable<any> {
    return this.http
      .get(`${this.hostAddress}:${this.endpointPort}/team`)
      .pipe(map(response =>
          response['success'] ? response['payload'] : false
        ))
      .pipe(catchError(err => {
          return throwError(err);
        }));
  }



}
