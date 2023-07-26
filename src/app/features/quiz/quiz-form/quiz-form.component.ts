import {Component, OnInit} from '@angular/core';
import {QuizService} from "../services/quiz.service";
import {take} from "rxjs";
import {TriviaCategory} from "../../../shared/models/domain/interfaces/trivia-category";
import {TriviaQuestion} from "../../../shared/models/domain/interfaces/trivia-question";
import {DifficultyType} from "../../../shared/models/domain/types/difficulty.type";
import {Router} from "@angular/router";
import {QuizzSelectForm} from "./quiz-select-form/quiz-select-form.component";
import {FormQuizValue} from "../../../shared/models/domain/interfaces/form-quiz-value";

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html'
})
export class QuizFormComponent implements OnInit {

  triviaDifficulties: DifficultyType[] = ['easy', 'medium', 'hard'];
  triviaCategories: TriviaCategory[] = [];
  triviaQuestions: TriviaQuestion[] = [];

  constructor(private quizService: QuizService,
              private router: Router) {}

  ngOnInit(): void {
    this.quizService.getCategory()
      .pipe(take(1))
      .subscribe(data => this.triviaCategories = data);
  }

  getQuestions(quizSelectForm: QuizzSelectForm) {
    this.triviaQuestions = [];
    const category = quizSelectForm.category;
    const difficulty = quizSelectForm.difficulty;

    this.quizService.getQuestions(category, difficulty)
      .pipe(take(1))
      .subscribe(triviaQuestions => {
        this.triviaQuestions = triviaQuestions;
      });
  }

  onSubmitQuizResponses(formQuizValue: FormQuizValue): void {
    this.redirectToResultsPage(formQuizValue);
  }

  private redirectToResultsPage(formQuizValue: FormQuizValue): void {
    this.router.navigate(['/quiz/results'], {
      state: {
        data: formQuizValue
      }
    });
  }
}
