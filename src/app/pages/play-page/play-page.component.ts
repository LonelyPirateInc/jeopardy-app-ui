import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { QuestionService } from 'src/app/data/question/question.service';
import { Subscription, from } from 'rxjs';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of, forkJoin } from 'rxjs';
import { map, mergeMap, filter, flatMap } from 'rxjs/operators';
import { UserService } from 'src/app/data/user/user.service';
import { SocketService } from 'src/app/data/socket.service';
@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss']
})
export class PlayPageComponent implements OnInit {
  question: any;
  questionSelectionSubscription: Subscription;
  user: any;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private userService: UserService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUserFromLocalStorage();
    const { role } = this.user;
    // console.log(role);
    // this.socketService.socket.on('questionSelected', (question) => {
    //   console.log('working?');
    //   this.question = question;
    // });

    if (role && role === 'host') {
      from(this.route.paramMap).pipe(flatMap((params) => {
        const questionId = params.get('questionId');
        return forkJoin(this.questionService.getQuestionById(questionId));
      })).subscribe((question: [any]) => {
        console.log(question);
        this.question = question[0];
      });
    } else {
      this.socketService.socket.on('questionSelected', (question) => {
        console.log('socket returning....');
        this.question = question;
      });
    }
  }
}
