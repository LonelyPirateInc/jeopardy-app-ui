import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
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
import { UserCreatePageComponent } from './pages/user-create-page/user-create-page.component';
import { TeamSelectionComponent } from './pages/client-page/team-selection/team-selection.component';
import { ClientPlayComponent } from './pages/client-page/client-play/client-play.component';

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
    UserCreatePageComponent,
    TeamSelectionComponent,
    ClientPlayComponent
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
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
