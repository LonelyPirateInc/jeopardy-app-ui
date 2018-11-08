import { Component, OnInit } from '@angular/core';
import { SocketService } from './data/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jeopardy-app-ui';


  constructor(
    private socketService: SocketService,
  ){

  }

  ngOnInit(): void {
    this.socketService.setupConnection();
    // socket.on('connect', () => {
    //   console.log('connected...');

    //   socket.emit('events', { test: 'test' });
    // });
  }
}
