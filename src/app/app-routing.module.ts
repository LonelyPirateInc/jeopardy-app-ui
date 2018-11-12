import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LeaderPageComponent } from './pages/leader-page/leader-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { PlayPageComponent } from './pages/play-page/play-page.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';
import { UserCreatePageComponent } from './pages/user-create-page/user-create-page.component';
import { TeamSelectionComponent } from './pages/client-page/team-selection/team-selection.component';
import { ClientPlayComponent } from './pages/client-page/client-play/client-play.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ClientResetPageComponent } from './pages/client-page/client-reset-page/client-reset-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'host',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'game', pathMatch: 'full' },
      { path: 'game', component: GamePageComponent },
      { path: 'play/:questionId', component: PlayPageComponent },
      { path: 'leadership', component: LeaderPageComponent },
      { path: 'teams', component: TeamPageComponent }
    ]
  },
  {
    path: 'client',
    component: ClientPageComponent,
    children: [
      { path: '', redirectTo: 'selectTeam', pathMatch: 'full' },
      { path: 'selectTeam', component: TeamSelectionComponent },
      { path: 'play/:gameId', component: ClientPlayComponent },
      { path: 'reset', component: ClientResetPageComponent }
    ]
  },
  {
    path: 'userCreate',
    component: UserCreatePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
