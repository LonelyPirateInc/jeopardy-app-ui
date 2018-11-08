import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorageService: LocalStorageService) { }

  public getUserFromLocalStorage(): any {
    // this.localStorageService.set('user', JSON.stringify({name: 'min', role: 'host'}));
    const user = JSON.parse(this.localStorageService.get<string>('user'));
    return user;
  }
}
