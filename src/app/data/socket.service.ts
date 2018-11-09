
import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subject, config } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: SocketIOClient.Socket;
  public socketConnectionSubject = new Subject<boolean>();
  constructor() { }
  setupConnection(socketConfig?: any): void {
    const configuration = socketConfig;
    this.socket = io('http://127.0.0.1:8083', { multiplex: true });
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
