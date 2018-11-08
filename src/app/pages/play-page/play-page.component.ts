import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { QuestionService } from 'src/app/data/question/question.service';
import { Subscription, from } from 'rxjs';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of, forkJoin } from 'rxjs';
import { map, mergeMap, filter, flatMap } from 'rxjs/operators';
@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss']
})
export class PlayPageComponent implements OnInit {
  question: any;
  questionSelectionSubscription: Subscription;

  constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit() {
    from(this.route.paramMap).pipe(flatMap((params) => {
      const questionId = params.get('questionId');
      return forkJoin(this.questionService.getQuestionById(questionId));
    })).subscribe((question: [any]) => {
      console.log(question);
      this.question = question[0];
    });
  }

  submitAnswers() {
    this.question.answers.forEach(answer => console.log(answer));
  }

  answerClicked(answer) {
    console.log(answer);
  }
}
