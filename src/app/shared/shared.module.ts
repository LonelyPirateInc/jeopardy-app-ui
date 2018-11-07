import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionCategoryComponent } from './question-category/question-category.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QuestionCategoryComponent],
  exports: [QuestionCategoryComponent]
})
export class SharedModule { }
