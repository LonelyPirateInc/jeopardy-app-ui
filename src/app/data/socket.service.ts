import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subject, config } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // private socket: SocketIOClient.Socket;
  public socketConnectionSubject = new Subject<boolean>();
  constructor() { }
  setupConnection(socketConfig?: any): SocketIOClient.Socket {
    const configuration = socketConfig;
    // const token: string = this.localStorageService.get<string>(AuthenticationService.TokenKey);
    // configuration['query'] = `auth_token=${token}`;
    return io('http://127.0.0.1:8083', configuration);
  }


}
