import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';


@NgModule({
  declarations: [
    QuizComponent,
    QuizFormComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }
