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

const routes: Routes = [
  {
    path: '',
    component: GamePageComponent
  },
  {
    path: 'leadership',
    component: LeaderPageComponent
  },
  {
    path: 'teams',
    component: TeamPageComponent
  },
  {
    path: 'play/:questionId',
    component: PlayPageComponent
  },
  {
    path: 'client',
    component: ClientPageComponent,
    children: [
      { path: '', redirectTo: 'selectTeam', pathMatch: 'full' },
      { path: 'selectTeam', component: TeamSelectionComponent },
      { path: 'play', component: ClientPlayComponent }
    ]
  },
  {
    path: 'userCreate',
    component: UserCreatePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
