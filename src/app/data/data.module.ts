import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './team/team.service';
import { UserService } from './user/user.service';
import { GameService } from './game/game.service';
import { QuestionService } from './question/question.service';
import { AnswerService } from './answer/answer.service';
import { ScoreService } from './score/score.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    TeamService,
    UserService,
    GameService,
    QuestionService,
    AnswerService,
    ScoreService,
  ]
})
export class DataModule { }
