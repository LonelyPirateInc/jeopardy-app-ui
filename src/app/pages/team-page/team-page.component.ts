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
  teams = [
		{
			"id": "855ed159-507a-4a92-be45-3cd358c30768",
			"name": "someTeamName",
			"createdAt": "2018-11-09T03:22:52.102Z",
			"updatedAt": "2018-11-09T03:22:52.102Z"
		}
	];


  constructor(private teamService: TeamService,
    ) { }

  ngOnInit() {
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
        .pipe(flatMap(data =>  this.handleModalCancel()))
        .pipe(flatMap(() => this.teamService.getAllTeams()))
        .subscribe(teams => this.teams = teams);
  }



}
