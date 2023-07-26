import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import {QuizService} from "./services/quiz.service";
import {ReactiveFormsModule} from "@angular/forms";
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import {SharedModule} from "../../shared/shared.module";
import {QuizSelectFormComponent} from "./quiz-form/quiz-select-form/quiz-select-form.component";
import { QuizResponsesSelectFormComponent } from './quiz-form/quiz-responses-select-form/quiz-responses-select-form.component';


@NgModule({
  declarations: [
    QuizComponent,
    QuizFormComponent,
    QuizResultsComponent,
    QuizSelectFormComponent,
    QuizResponsesSelectFormComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [QuizService]
})
export class QuizModule { }
