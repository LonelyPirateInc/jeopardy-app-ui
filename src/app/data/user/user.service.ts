import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  public createUser(username: string): Observable<any> {
    return this.http
      .post(`http://127.0.0.1:3000/user/register`, { username })
      .pipe(map(response => {
        if (response['success']) {
          localStorage.setItem('user', JSON.stringify(response['payload']));
          return response['payload'];
        }
      }))
      .pipe(catchError(err => {
        return throwError(err);
      }));
  }

  public checkUserExist(): any {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
}
