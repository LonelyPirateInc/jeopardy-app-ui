import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/data/team/team.service';
import { UserService } from 'src/app/data/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-team-selection",
  templateUrl: "./team-selection.component.html",
  styleUrls: ["./team-selection.component.scss"]
})
export class TeamSelectionComponent implements OnInit {
  teams: any;
  selectedTeam: any;
  username: string;
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.checkUserAlreadyExist()) {
      this.teamService
        .getAllTeams()
        .subscribe((teams: any) => (this.teams = teams));
    }
  }

  createUser() {
    if (this.username) {
      if (!this.checkUserAlreadyExist()) {
        this.userService.createUser(this.username).subscribe(() => {
          this.handleSelect(this.selectedTeam);
          this.router.navigate(["client/play"]);
        });
      }
    }
  }

  checkUserAlreadyExist(): boolean {
    const user = this.userService.checkUserExist();
    if (user && user.userType === "player") {
      this.router.navigate(["client/play"]);
    }

    return Boolean(user);
  }

  handleSelect(team: any): void {
    localStorage.setItem("team", JSON.stringify(team));
  }

  tap() {
    console.log('tapping...');
  }
}
