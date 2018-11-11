import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  hostAddress = environment.hostAddress;
  socketPort = environment.socketPort;
  endpointPort = environment.endpointPort;
  constructor() { }
}
