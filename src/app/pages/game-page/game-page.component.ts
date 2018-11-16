import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/data/game/game.service';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap,filter } from 'rxjs/operators';
import { QuestionService } from 'src/app/data/question/question.service';

import { of, forkJoin } from 'rxjs';
import * as sortyBy from 'lodash/sortBy';
import * as groupBy from 'lodash/groupBy';
import * as isEmpty from 'lodash/isEmpty';
import { Router, NavigationEnd } from '@angular/router';
import { SocketService } from 'src/app/data/socket.service';

@Component({
  selector: "app-game-page",
  templateUrl: "./game-page.component.html",
  styleUrls: ["./game-page.component.scss"]
})
export class GamePageComponent implements OnInit {
  questions: any;
  categories: any;
  allInCategory: any;
  existsGame: boolean;
  game: any;
  isVisible: boolean;
  newGameName: string;
  showGamePlay: boolean;
  selectedQuestion: any;
  isAllInAvailable: boolean;
  navigationSubscription: Subscription;

  constructor(
    private gameService: GameService,
    private questionService: QuestionService,
    private router: Router,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        forkJoin(
          this.questionService.getQuestionCategories(),
          this.gameService.getRecentGame()
        ).subscribe((data: [any, any]) => {
          const [categories, game] = data;
          this.questions = game.questions;
          this.sortQuestionsByCategory(this.questions, categories);

          const categoriesGrouped = groupBy(
            categories,
            category => category.isAllIn
          );
          this.categories = categoriesGrouped[false];
          this.allInCategory = categoriesGrouped[true];
          this.isAllInAvailable = !isEmpty(
            this.allInCategory[0].questions.filter(question => !question.isActive)
          );

          this.socketService.socket.emit("gameStart", game);
          this.existsGame = true;
          this.game = game;
        });
      }
    });

    forkJoin(
      this.questionService.getQuestionCategories(),
      this.gameService.getRecentGame()
    ).subscribe((data: [any, any]) => {
      const [categories, game] = data;
      this.questions = game.questions;
      this.sortQuestionsByCategory(this.questions, categories);

      const categoriesGrouped = groupBy(
        categories,
        category => category.isAllIn
      );
      this.categories = categoriesGrouped[false];
      this.allInCategory = categoriesGrouped[true];
      console.log(this.allInCategory);
      this.isAllInAvailable = !isEmpty(
        this.allInCategory[0].questions.filter(question => !question.isActive)
      );
      this.socketService.socket.emit("gameStart", game);
      this.existsGame = true;
      this.game = game;
    });
  }

  private sortQuestionsByCategory(questions: any, categories: any): void {
    const sortedQuestions = groupBy(
      questions,
      question => question.category.id
    );
    categories.forEach(
      category => (category.questions = sortedQuestions[category.id])
    );
  }

  public createGame(name: string): void {
    forkJoin(
      this.questionService.getQuestionCategories(),
      this.gameService.createGame(name)
    ).subscribe((data: [any, any]) => {
      const [categories, game] = data;
      this.questions = game.questions;
      this.sortQuestionsByCategory(this.questions, categories);
      const categoriesGrouped = groupBy(
        categories,
        category => category.isAllIn
      );
      this.categories = categoriesGrouped[false];
      this.allInCategory = categoriesGrouped[true];
      this.existsGame = true;
      this.game = game;
      this.socketService.socket.emit("gameStart", game);
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
    const playUrl = "host/play/";
    this.router.navigate([playUrl, question.id]);
  }

  public showAllIn(): void {
    const playUrl = "host/play/";
    const question = this.allInCategory[0].questions[0];
    this.router.navigate([playUrl, question.id]);
  }

  public checkAllInDisabled(): boolean {
    return false;
  }
}
