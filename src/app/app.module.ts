import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { DataModule } from './data/data.module';
import { LeaderPageComponent } from './pages/leader-page/leader-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { PlayPageComponent } from './pages/play-page/play-page.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    HomePageComponent,
    LeaderPageComponent,
    TeamPageComponent,
    PlayPageComponent,
    ClientPageComponent,
  ],
  imports: [
    SharedModule,
    DataModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
