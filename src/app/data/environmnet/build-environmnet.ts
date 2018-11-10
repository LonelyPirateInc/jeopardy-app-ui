import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class BuildEnvironment {
    public serviceHost: string;
    public socketHost: string;

    constructor(private httpClient: HttpClient) {}

    initialize(): Promise<any> {
        return this.httpClient.get('assets/config/env.json')
        .pipe(map((buildConfig) => {
            this.serviceHost = buildConfig['serviceHost'];
            this.socketHost = buildConfig['socketHost'];
            
            return this.serviceHost;
        }))
        .toPromise();
    }
}