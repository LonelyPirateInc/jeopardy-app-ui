import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { QuestionService } from 'src/app/data/question/question.service';
import { Subscription, from } from 'rxjs';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of, forkJoin, interval, Observable } from 'rxjs';
import { map, mergeMap, filter, flatMap } from 'rxjs/operators';
import { AnswerService } from 'src/app/data/answer/answer.service';
import { GameService } from '../../data/game/game.service';
import { SocketService } from '../../data/socket.service';

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
  subscription: Subscription;

  songName: string;
  showAnswers = false;
  showSubmitAnswersButton = true;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private answerService: AnswerService,
              private gameService: GameService,
              private socketService: SocketService,
    ) { }

  ngOnInit() {

    this.subscription = this.socketService.getMessage().subscribe(message => {
      console.log(message);
      this.typeOfMessage(message);
    });

    console.log("sub", this.subscription);




    from(this.route.paramMap).pipe(flatMap((params) => {
      const questionId = params.get('questionId');
      return forkJoin(this.questionService.getQuestionById(questionId));
    })).subscribe((question: [any]) => {
      this.question = question[0];
      console.log(this.question);
    });
  }


  typeOfMessage(message) {
    console.log("here");
    switch (message.type) {
      case 'showQuestion':
          break;
      case 'showAnswers':
        this.showQuestionAnswers();
          break;
      case 'musicStart':
          break;
      default:
            return;
  }
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
  }


  submitAnswers() {
    this.answers = [];
    // get answers object based on answer ids 
    this.getAnswers();

    this.gameService.getRecentGame()
      .pipe(flatMap(game => this.answerService.submitAnswers(this.answers, this.question.id, game.id)))
      .subscribe(response => {
        console.log(response);
        this.showSubmitAnswersButton = false;
      });
  }

  updateArrayOfAnswers(value: any[]): void {
    this.answersIds = value;
  }

  showQuestionAnswers(hostClicked = false) {
    this.showAnswers = true;

    if (!hostClicked) {
      this.socketService.emitMessage("showAnswers");
    }
  }

  startMusic() {
    this.audio = new Audio();
    this.audio.src = `../../../assets/sound/${this.question.musicNamePath}`;
    this.songName = this.question.musicName;
    this.audio.load();
    this.audio.play();
    const self = this;
    this.audio.addEventListener("loadeddata", function() {
      // set timeer
      self.countDown = Math.floor(this.duration);
      self.countBack();
     });
  }


  ngOnDestroy() {
    if(this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}
