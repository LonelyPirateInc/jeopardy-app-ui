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
  songName: string;
  showAnswers = false;
  showCorrectAnswersButton = false;
  showSubmitAnswersButton = true;
  disableStartMusicButton = false;
  alphabets: any;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private gameService: GameService,
    private socketService: SocketService,
  ) { }

  ngOnInit() {
    this.alphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
    from(this.route.paramMap).pipe(flatMap((params) => {
      const questionId = params.get('questionId');
      return forkJoin(this.questionService.getQuestionById(questionId));
    })).subscribe((question: [any]) => {
      this.question = question[0];
      this.socketService.socket.emit('showQuestion', this.question);
    });
  }

  countBack() {
    const source = interval(1000).subscribe(i => {
      this.countDown--;
      if (this.countDown <= 0 ) {
        source.unsubscribe();
        this.showCorrectAnswersButton = true;
      }
    });
  }

  getAnswers() {
    this.question.answers.forEach(answer => {
      this.answersIds.forEach(answerId => { if (answer.id === answerId) { this.answers.push(answer); } });
    });
  }

  // submitAnswers() {
  //   this.answers = [];
  //   // get answers object based on answer ids 
  //   this.getAnswers();

  //   this.gameService.getRecentGame()
  //     .pipe(flatMap(game => this.answerService.submitAnswers(this.answers, this.question.id, game.id)))
  //     .subscribe(response => {
  //       console.log(response);
  //       this.showSubmitAnswersButton = false;
  //     });
  // }

  updateArrayOfAnswers(value: any[]): void {
    this.answersIds = value;
  }

  showQuestionAnswers() {
    this.showAnswers = true;
    this.socketService.socket.emit('showAnswers', this.question.answers);
  }

  startMusic() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    this.audio = new Audio();
    this.audio.src = `../../../assets/sound/${this.question.musicNamePath}`;
    this.songName = this.question.musicName;
    this.audio.load();
    this.audio.play();
    const self = this;
    this.audio.addEventListener('loadeddata', function() {
      self.socketService.socket.emit('musicStart', this.duration);
      self.countDown = Math.floor(this.duration);
      self.countBack();
     });

    this.disableStartMusicButton = true;
  }


  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}
