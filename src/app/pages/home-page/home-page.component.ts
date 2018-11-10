import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/data/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isCollapsed = false;
  isReverseArrow = false;
  width = 200;
  user: any;
  showSidebar: boolean;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.checkUserExist();
    if (this.user && this.user.userType === 'host') {
      this.showSidebar = this.user && this.user.userType === 'host';
    } else {
      this.router.navigate(['']);
    }
  }
}
