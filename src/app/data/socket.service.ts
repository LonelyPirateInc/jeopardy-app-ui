
import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subject, config } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: SocketIOClient.Socket;
  public socketConnectionSubject = new Subject<boolean>();
  private subject = new Subject<any>();

  constructor() { }
  setupConnection(socketConfig?: any): void {
    const configuration = socketConfig;
    this.socket = io('http://127.0.0.1:8083', { multiplex: true });
    // this.socket.on('connect', () => {
    //   console.log('connected...');
    // });


    this.socket.emit('events', { test: 'testing' });
    // this.socket.on('events', (data) => {

    // });
    this.socket.on('questionSelected', (data) => {
      console.log(data);
    });

    this.socket.on('events', (data) => {
      console.log('connecting...');
      console.log(data);
      this.sendMessage('events');
    });

    this.socket.on('showAnswers', () => {
      console.log("showAnswers");
      this.sendMessage('showAnswers');
    });


    this.socket.on('showQuestion', () => {
      console.log("showQuestion");
      this.sendMessage('showQuestion');
    });


    this.socket.on('musicStart', () => {
      console.log("musicStart");
      this.sendMessage('musicStart');
    });

  }


  emitMessage(message) {
    this.socket.emit(message, { event: message, message });
  }


  sendMessage(message: string) {
    console.log("message");
    this.subject.next({ type: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  sendQuestionSelectEvent(question: any): void {
    this.socket.emit('events', { test: 'testing' });
    this.socket.emit('questionSelected', question);
  }
}
