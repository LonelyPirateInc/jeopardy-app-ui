import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { QuestionService } from 'src/app/data/question/question.service';
import { Subscription, from } from 'rxjs';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of, forkJoin, interval, Observable } from 'rxjs';
import { map, mergeMap, filter, flatMap } from 'rxjs/operators';
import { AnswerService } from 'src/app/data/answer/answer.service';
import { GameService } from '../../data/game/game.service';
import { SocketService } from 'src/app/data/socket.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit, OnDestroy {
  question: any;
  questionSelectionSubscription: Subscription;
  answersIds = [];
  answers = [];
  audio: any;
  countDown: any;
  songName: string;
  showAnswers = false;
  showSubmitAnswersButton = true;
  canPlay: boolean;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private gameService: GameService,
    private socketService: SocketService,
  ) { }

  ngOnInit() {
    this.subscribeToSockets();
  }

  subscribeToSockets(): void {
    this.socketService.socket.on('showQuestion', (question: any) => {
      console.log('showQuestion????');
      this.question = question;
    });

    this.socketService.socket.on('showAnswers', (question: any) => {
      console.log('showAnswers????');
      this.showAnswers = true;
    });

    this.socketService.socket.on('musicStart', (question: any) => {
      console.log('musicStart????');
      this.canPlay = true;
    });
  }


  countBack() {
    const source = interval(1000).subscribe(i => {
      this.countDown--;
    });

    if (this.countDown <= 0) {
      source.unsubscribe();
    }
  }

  getAnswers() {
    this.question.answers.forEach(answer => this.answersIds.forEach(answerId => { if (answer.id === answerId) { this.answers.push(answer) } }));
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

  showQuestionAnswers() {
    this.showAnswers = true;
  }

  startMusic() {
    this.audio = new Audio();
    this.audio.src = `../../../assets/sound/${this.question.musicNamePath}`;
    this.songName = this.question.musicName;
    this.audio.load();
    this.audio.play();
    const self = this;
    this.audio.addEventListener("loadeddata", function () {
      // set timeer
      self.countDown = Math.floor(this.duration);
      self.countBack();
    });
  }


  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}


// import { Component, OnInit } from '@angular/core';
// import { SocketService } from 'src/app/data/socket.service';

// @Component({
//   selector: 'app-client-page',
//   templateUrl: './client-page.component.html',
//   styleUrls: ['./client-page.component.scss']
// })
// export class ClientPageComponent implements OnInit {
//   question: any;
//   constructor(private socketService: SocketService) { }

//   ngOnInit() {
//   }

//   subscribeToSockets(): void {
//     this.socketService.socket.on('showQuestion', (question: any) => {
//       this.question = question;
//     });

//     this.socketService.socket.on('showAnswers', (question: any) => {
//       this.question = question;
//     });
//   }

// }
