import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-reset-page',
  templateUrl: './client-reset-page.component.html',
  styleUrls: ['./client-reset-page.component.scss']
})
export class ClientResetPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.clear();
    this.router.navigate(['/client']);
  }

}
