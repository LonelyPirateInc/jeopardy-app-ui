import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as groupBy from 'lodash/groupBy';
import * as forIn from 'lodash/forIn';
import * as isEmpty from 'lodash/isEmpty';
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

  activeQuestionMapper = {
    0: true,
    1: true,
    2: true,
  };

  questions: any;
  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit() {
    this.questions = this.sortQuestionsByDifficulty(this.category.questions);
  }

  private sortQuestionsByDifficulty(questions: any): void {
    const sortedQuestions = groupBy(questions, question => question.difficulty);
    this.setActiveQuestionMapper(sortedQuestions);
    return sortedQuestions;
  }

  selectDifficulty(difficulty: number): void {
    const activeQuestions = this.questions[difficulty].filter(question => question.isActive);
    this.questionSelected.emit(activeQuestions[0]);
  }

  setActiveQuestionMapper(questions): void {
    forIn(questions, (value, key) => {
      const isActive = value.filter(item => !item.isActive);
      console.log(isActive);
      this.activeQuestionMapper[key] = isEmpty(isActive);
      console.log(this.activeQuestionMapper);
    });
  }

  checkActiveQuestion(): void {

  }
}
