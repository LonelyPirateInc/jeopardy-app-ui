import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/data/game/game.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { QuestionService } from 'src/app/data/question/question.service';

import { of, forkJoin } from 'rxjs';
import * as sortyBy from 'lodash/sortBy';
import * as groupBy from 'lodash/groupBy';
// import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  questions: any;
  categories: any;

  constructor(
    private gameService: GameService,
    private questionService: QuestionService,
  ) { }

  ngOnInit() {
  }

  public createGame(name: string): void {
    forkJoin(
      this.questionService.getQuestionCategories(),
      this.gameService.createGame(name)
    ).subscribe(data => {
      const [categories, questions] = data;
      this.categories = categories;
      const sortedQuestions = groupBy(questions, question => question.category.id);
      this.categories.forEach(category => {
        category.questions = sortedQuestions[category.id];
      });
    });

    // console.log(name);
    // this.gameService.createGame(name)
    // .pipe(mergeMap(this.questionService.getQuestionCategories))
    // .subscribe((data: [any, any]) => {
    //   console.log(data[0]);
    //   console.log(data[1]);
    // });
  }

  private sortQuestionsByCategory(questions: any): any {
    return questions.map(question => {

    });
  }

}
