import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as groupBy from 'lodash/groupBy';
import { QuestionService } from 'src/app/data/question/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-category',
  templateUrl: './question-category.component.html',
  styleUrls: ['./question-category.component.scss']
})
export class QuestionCategoryComponent implements OnInit {
  @Input() category: any;
  @Output() questionSelected = new EventEmitter();

  questions: any;
  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit() {
    this.questions = this.sortQuestionsByDifficulty(this.category.questions);
  }

  private sortQuestionsByDifficulty(questions: any): void {
    return groupBy(questions, question => question.difficulty);
  }

  selectDifficulty(difficulty: number): void {
    const activeQuestions = this.questions[difficulty].filter(question => question.isActive);
    this.questionSelected.emit(activeQuestions[0]);
  }
}
