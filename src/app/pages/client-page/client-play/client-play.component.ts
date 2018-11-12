import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of, forkJoin, interval, Observable } from 'rxjs';
import { map, mergeMap, filter, flatMap } from 'rxjs/operators';
import { QuestionService } from 'src/app/data/question/question.service';
import { AnswerService } from 'src/app/data/answer/answer.service';
import { GameService } from 'src/app/data/game/game.service';
import { SocketService } from 'src/app/data/socket.service';
import { ScoreService } from 'src/app/data/score/score.service';


@Component({
  selector: 'app-client-play',
  templateUrl: './client-play.component.html',
  styleUrls: ['./client-play.component.scss']
})
export class ClientPlayComponent implements OnInit, OnDestroy {
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
  team: any;
  user: any;
  score = 0;
  game: any;
  submittedAnswers = false;
  isAllInQuestion = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private gameService: GameService,
    private socketService: SocketService,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.team = JSON.parse(localStorage.getItem('team'));
    console.log(this.team);

    if (!this.user && !this.team) {
      this.router.navigate(['client/selectTeam']);
    } else {
      // this.gameService.getGameScoreByTeam(this.question.game.id, this.team.id).subscribe(score => this.score = score);
    }

    this.subscribeToSockets();
  }

  subscribeToSockets(): void {
    this.socketService.socket.on('showQuestion', (question: any) => {
      this.question = question;
      this.isAllInQuestion = question.category.isAllIn;
    });

    this.socketService.socket.on('showAnswers', (question: any) => {
      this.showAnswers = true;
    });

    this.socketService.socket.on('musicStart', (duration: any) => {
      this.countDown = Math.floor(duration);
      this.countBack();
      this.canPlay = true;
    });
  }



  countBack() {
    const source = interval(1000).subscribe(i => {
      this.countDown--;
      if (this.countDown <= 0) {
        source.unsubscribe();
        this.canPlay = false;
        if (!this.submittedAnswers) {
          this.submitAnswers();
        }
        this.question = null;
      }
    });
  }

  getSelectedAnswers() {
    this.question.answers.forEach(answer => {
      this.answersIds.forEach(answerId => { if (answer.id === answerId) { this.answers.push(answer); } });
    });
  }


  submitAnswers() {
    this.canPlay = false;
    this.answers = [];
    // get answers object based on answer ids 
    this.getSelectedAnswers();

    const { game } = this.question;
    const team = JSON.parse(localStorage.getItem('team'));
    this.answerService.submitAnswers(this.answers, this.question.id, game.id, team, this.isAllInQuestion).subscribe((score) => {
      this.score = score;
      this.showSubmitAnswersButton = false;
      this.submittedAnswers = true;
    }, () => {
      this.canPlay = true;
    });

    // this.gameService.getRecentGame()
    //   .pipe(flatMap(game => this.answerService.submitAnswers(this.answers, this.question.id, game.id)))
    //   .subscribe(response => {
    //     console.log(response);
    //     this.showSubmitAnswersButton = false;
    //   });
  }

  updateArrayOfAnswers(value: any[]): void {
    this.answersIds = value;
  }

  showQuestionAnswers() {
    this.showAnswers = true;
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