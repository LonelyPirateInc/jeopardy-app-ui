import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: "app-question-category",
  templateUrl: "./question-category.component.html",
  styleUrls: ["./question-category.component.scss"]
})
export class QuestionCategoryComponent implements OnInit {
  @Input() category: any;
  constructor() {}

  ngOnInit() {}

  selectDifficulty(difficulty: number): void {
    console.log(difficulty);
  }
}
