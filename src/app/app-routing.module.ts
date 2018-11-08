import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LeaderPageComponent } from './pages/leader-page/leader-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { PlayPageComponent } from './pages/play-page/play-page.component';

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
    path: 'play',
    component: PlayPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
