import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import {QuizFormComponent} from "./quiz-form/quiz-form.component";

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
      { path: '', component: QuizFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
