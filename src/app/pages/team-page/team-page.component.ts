import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../data/team/team.service';
import { map, catchError, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
  newTeamName: string;
  isVisible = false;
  teams: any;
  sortName = null;
  sortValue = null;
  displayData = [];


  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((teams) => {
      this.teams = teams;
      this.displayData = [...this.teams];
    });
  }

  public showModal(): void {
    this.isVisible = true;
  }

  public handleModalCancel(): void {
    this.isVisible = false;
  }


  public handleModalSubmit(): void {
    if (this.newTeamName && this.newTeamName.length) {
      this.createTeam(this.newTeamName);
    }
  }


  public createTeam(name: string): void {
      this.teamService.createTeam(name)
        .pipe(flatMap(() => this.teamService.getAllTeams()))
        .subscribe(teams => {
          this.teams = teams;
          this.handleModalCancel();
        });
  }



}
