import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/data/game/game.service';
import { Observable } from 'rxjs';
import { map, mergeMap,filter } from 'rxjs/operators';
import { QuestionService } from 'src/app/data/question/question.service';

import { of, forkJoin } from 'rxjs';
import * as sortyBy from 'lodash/sortBy';
import * as groupBy from 'lodash/groupBy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  questions: any;
  categories: any;
  allInCategory: any;
  existsGame: boolean;
  game: any;
  isVisible: boolean;
  newGameName: string;

  constructor(
    private gameService: GameService,
    private questionService: QuestionService,
    private router: Router
  ) { }

  ngOnInit() {
    forkJoin(
      this.questionService.getQuestionCategories(),
      this.gameService.getRecentGame()
    ).subscribe((data: [any, any]) => {
      const [categories, game] = data;
      this.questions = game.questions;
      this.sortQuestionsByCategory(this.questions, categories);

      const categoriesGrouped = groupBy(categories, category => category.isAllIn);
      this.categories = categoriesGrouped[false];
      this.allInCategory = categoriesGrouped[true];
      
      this.existsGame = true;
      this.game = game;
    });
  }

  private sortQuestionsByCategory(questions: any, categories: any): void {
    const sortedQuestions = groupBy(questions, question => question.category.id);
    categories.forEach(category => category.questions = sortedQuestions[category.id]);
  }

  public createGame(name: string): void {
    forkJoin(
      this.questionService.getQuestionCategories(),
      this.gameService.createGame(name)
    ).subscribe((data: [any, any]) => {
      const [categories, game] = data;
      this.questions = game.questions;
      this.sortQuestionsByCategory(this.questions, categories);

      const categoriesGrouped = groupBy(categories, category => category.isAllIn);
      this.categories = categoriesGrouped[false];
      this.allInCategory = categoriesGrouped[true];

      this.existsGame = true;
      this.game = game;
      this.handleModalCancel();
    });
  }

  public handleModalCancel(): void {
    this.isVisible = false;
  }

  public showModal(): void {
    this.isVisible = true;
  }

  public handleModalSubmit(): void {
    if (this.newGameName && this.newGameName.length) {
      this.createGame(this.newGameName);
    }
  }

  public showQuestion(question: any): void {
    const playUrl = '/play';
    const navigationExtras = {
      queryParams: {
        questionId: question.id
      }
    };
    this.router.navigateByUrl(playUrl, navigationExtras);
    this.questionService.questionSelected.next(question);
  }
}
