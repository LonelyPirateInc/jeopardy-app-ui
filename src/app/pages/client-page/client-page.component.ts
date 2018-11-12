import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../../data/socket.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    // this.socketService.socket.emit();
  }
}