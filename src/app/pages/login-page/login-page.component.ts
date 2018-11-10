import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/data/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  username = 'al.lounsbury';
  passcode: string;
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public authenticate(): void {
    this.userService.authenticate(this.username, this.passcode).subscribe(() => {
      this.router.navigate(['host']);
    });
  }
}
