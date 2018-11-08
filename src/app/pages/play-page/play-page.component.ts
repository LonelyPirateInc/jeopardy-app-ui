import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { QuestionService } from 'src/app/data/question/question.service';
import { Subscription, from } from 'rxjs';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of, forkJoin, interval, Observable } from 'rxjs';
import { map, mergeMap, filter, flatMap } from 'rxjs/operators';
import { AnswerService } from 'src/app/data/answer/answer.service';
import { GameService } from '../../data/game/game.service';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss']
})
export class PlayPageComponent implements OnInit, OnDestroy {
  question: any;
  questionSelectionSubscription: Subscription;
  answersIds = [];
  answers = [];
  audio: any;
  countDown: any;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private answerService: AnswerService,
              private gameService: GameService,
    ) { }

  ngOnInit() {
    from(this.route.paramMap).pipe(flatMap((params) => {
      const questionId = params.get('questionId');
      return forkJoin(this.questionService.getQuestionById(questionId));
    })).subscribe((question: [any]) => {
      this.question = question[0];
      console.log(this.question);
      this.audio = new Audio();
      this.audio.src = `../../../assets/sound/${this.question.id}.mp3`;
      this.audio.load();
      this.audio.play();
      const self = this;
      this.audio.addEventListener("loadeddata", function() {
        // set timeer
        self.countDown = Math.floor(this.duration);
        self.countBack();
       });
    });
  }


  countBack() {
    const source = interval(1000).subscribe(i => {
      this.countDown--;
    });

    if (this.countDown <= 0 ) {
      source.unsubscribe();
    }
  }

  getAnswers() {
    this.question.answers.forEach(answer => this.answersIds.forEach(answerId => { if (answer.id === answerId) {this.answers.push(answer)} }));
    // this.answers = this.question.answers.filter(answer => this.answersIds.filter(answerId => answer.id === answerId ));
    // console.log("answers" , this.answers);
  }


  submitAnswers() {
    // get answers object based on answer ids 
    this.getAnswers();

    this.gameService.getRecentGame()
      .pipe(flatMap(game => this.answerService.submitAnswers(this.answersIds, this.question.id, game.id)))
      .subscribe(response => console.log(response));
}

  updateArrayOfAnswers(value: any[]): void {
    this.answersIds = value;
  }


  ngOnDestroy() {
    if(this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}
