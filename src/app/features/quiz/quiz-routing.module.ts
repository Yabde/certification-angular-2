import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import {QuizFormComponent} from "./quiz-form/quiz-form.component";
import {QuizResultsComponent} from "./quiz-results/quiz-results.component";

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
      { path: '', component: QuizFormComponent },
      { path: 'results', component: QuizResultsComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
