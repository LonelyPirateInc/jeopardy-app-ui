import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from 'src/app/data/question/question.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss']
})
export class PlayPageComponent implements OnInit, OnDestroy {
  questionSelectionSubscription: Subscription;
  question: any;
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.subscribeToSubject();
  }

  private subscribeToSubject(): void {
    this.questionSelectionSubscription = this.questionService.questionSelected.subscribe(question => {
      console.log(question);
      this.question = question;
    });
  }

  ngOnDestroy(): void {
    this.questionSelectionSubscription.unsubscribe();
  }
}
