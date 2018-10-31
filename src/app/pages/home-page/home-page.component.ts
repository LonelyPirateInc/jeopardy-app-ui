import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isCollapsed = false;
  isReverseArrow = false;
  width = 200;
  constructor() {}

  ngOnInit() {}
}
