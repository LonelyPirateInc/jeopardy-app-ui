import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {

    this.teams = [
      {
        "id": "855ed159-507a-4a92-be45-3cd358c30768",
        "name": "TeamA",
        "createdAt": "2018-11-09T03:22:52.102Z",
        "updatedAt": "2018-11-09T03:22:52.102Z",
        "score": 1200
      },
      {
        "id": "855ed159-507a-4a92-be45-3cd358c30768",
        "name": "TeamB",
        "createdAt": "2018-11-09T03:22:52.102Z",
        "updatedAt": "2018-11-09T03:22:52.102Z",
        "score": -200
      },
      {
        "id": "855ed159-507a-4a92-be45-3cd358c30768",
        "name": "TeamC",
        "createdAt": "2018-11-09T03:22:52.102Z",
        "updatedAt": "2018-11-09T03:22:52.102Z",
        "score": 3500 
      }
    ];

    this.displayData = [ ...this.teams ];
    this.sort({key: "score", value: "descend"});
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.displayData = [...this.teams.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1))];
  }


}
