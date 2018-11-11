
import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subject, config } from 'rxjs';
import * as io from 'socket.io-client';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends BaseService {
  public socket: SocketIOClient.Socket;
  public socketConnectionSubject = new Subject<boolean>();
  constructor() {
    super();
  }
  setupConnection(socketConfig?: any): void {
    const configuration = socketConfig;
    this.socket = io(`${this.hostAddress}:${this.socketPort}`, { multiplex: true });
    this.socket.on('connect', () => {
      console.log('connected...');
    });


    this.socket.emit('events', { test: 'testing' });
    this.socket.on('events', (data) => {
      console.log('connecting...');
      console.log(data);
    });
    this.socket.on('questionSelected', (data) => {
      console.log(data);
    });

    this.socket.on('events', (data) => {
      console.log(data);
    });
  }

  sendQuestionSelectEvent(question: any): void {
    this.socket.emit('events', { test: 'testing' });
    this.socket.emit('questionSelected', question);
  }
}
