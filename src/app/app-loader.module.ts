import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BuildEnvironment } from './data/environmnet/build-environmnet';

export function init_app(buildEnvironment: BuildEnvironment) {
    return () => buildEnvironment.initialize();
}

@NgModule({
    imports: [HttpClientModule],
    providers: [
        BuildEnvironment,
        { provide: APP_INITIALIZER, useFactory: init_app, deps: [BuildEnvironment], multi: true },
    ]
})
export class AppLoadModule { }
