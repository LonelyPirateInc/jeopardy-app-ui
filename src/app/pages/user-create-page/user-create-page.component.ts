import { Component, OnInit } from '@angular/core';
import { UserService } from '../../data/user/user.service';
import { flatMap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-create-page',
  templateUrl: './user-create-page.component.html',
  styleUrls: ['./user-create-page.component.scss']
})
export class UserCreatePageComponent implements OnInit {
  username: string;


  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }


  createUser() {
    if (this.username) {
      // check to see if user has record in localStorage to compare to 
      const user = localStorage.getItem('user');
      if (user) {
        // reroute to team page
        this.router.navigate(['/teams']);

      } else {
        this.userService.createUser(this.username).subscribe(newUser => {
          // store in localsotrage
          localStorage.setItem('user', JSON.stringify(newUser));
           // reroute to team page
           this.router.navigate(['/teams']);

      });
      }
    }
  }
}
