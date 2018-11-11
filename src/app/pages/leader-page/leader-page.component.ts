import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/data/team/team.service';
import { Subscription, from } from 'rxjs';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of, forkJoin, interval, Observable } from 'rxjs';
import { map, mergeMap, filter, flatMap } from 'rxjs/operators';
import { GameService } from 'src/app/data/game/game.service';
@Component({
  selector: 'app-leader-page',
  templateUrl: './leader-page.component.html',
  styleUrls: ['./leader-page.component.scss']
})
export class LeaderPageComponent implements OnInit {
  teams: any[];
  sortName = null;
  sortValue = null;
  displayData = [ ];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    from(this.gameService.getRecentGame())
      .pipe(flatMap(game => forkJoin(this.gameService.getGameScores(game.id))))
      .subscribe((data: [any]) => {
        this.teams = data[0];
        this.displayData = [...this.teams];
        console.log(this.displayData);
        this.sort({ key: "point", value: "descend" });
      });
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.displayData = [...this.teams.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1))];
  }


}
