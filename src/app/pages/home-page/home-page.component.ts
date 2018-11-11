import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/data/user/user.service';
import { Router } from '@angular/router';
import { GameService } from 'src/app/data/game/game.service';
import { flatMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

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
  isVisible = false;

  constructor(
    private userService: UserService,
    private gameService: GameService,
    private router: Router,
    private notificationService: NzNotificationService,
  ) { }


  ngOnInit() {
    this.user = this.userService.checkUserExist();
    if (this.user && this.user.userType === 'host') {
      this.showSidebar = this.user && this.user.userType === 'host';
    } else {
      this.router.navigate(['']);
    }
  }


  public showModal(): void {
    this.isVisible = true;
  }

  handleModalSubmit() {
    this.gameService
      .getRecentGame()
      .pipe(flatMap(recentGame => this.gameService.resetGame(recentGame)))
      .pipe(flatMap(game => this.gameService.createGame(game['name']) ))
      .subscribe(game => {
        this.router.navigate(['host/game']);
        this.notificationService.blank('Successful Game Reset!', 'Game is reset. New game is created');
        this.handleModalCancel();
      });
  }

  handleModalCancel() {
    this.isVisible = false;
  }
}
