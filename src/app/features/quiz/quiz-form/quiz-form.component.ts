import {Component, OnInit} from '@angular/core';
import {QuizService} from "../services/quiz.service";
import {take} from "rxjs";
import {TriviaCategory} from "../../../shared/models/domain/interfaces/trivia-category";
import {TriviaQuestion} from "../../../shared/models/domain/interfaces/trivia-question";
import {DifficultyType} from "../../../shared/models/domain/types/difficulty.type";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FormQuizzValue} from "../../../shared/models/domain/interfaces/form-quizz-value";
import {hasOneChoiceSelectedValidator} from "../../../shared/validators/quiz-one-choice-selected-validator";

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html'
})
export class QuizFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    category: new FormControl('', [Validators.required]),
    difficulty: new FormControl('')
  });

  triviaDifficulties: DifficultyType[] = ['easy', 'medium', 'hard'];
  triviaCategories: TriviaCategory[] = [];
  triviaQuestions: TriviaQuestion[] = [];

  formQuiz!: FormGroup;

  constructor(private quizService: QuizService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.quizService.getCategory()
      .pipe(take(1))
      .subscribe(data => this.triviaCategories = data);

    this.formQuiz = this.fb.group({
      questions: this.fb.array([])
    })
  }

  get difficulty(): FormControl {
    return this.form.get('difficulty') as FormControl;
  }

  get category(): FormControl {
    return this.form.get('category') as FormControl;
  }

  get questions(): FormArray<FormGroup> {
    return this.formQuiz.get('questions') as FormArray<FormGroup>;
  }

  choices(formGroup: FormGroup): string[] {
    return formGroup.get('choices')?.value;
  }

  getQuestions() {
    if (this.form.valid) {
      this.triviaQuestions = [];
      const category = this.category.value;
      const difficulty = this.difficulty.value;

      this.quizService.getQuestions(category, difficulty)
        .pipe(take(1))
        .subscribe(triviaQuestions => {
          this.triviaQuestions = triviaQuestions;

          this.questions.clear();
          for (let q of triviaQuestions) {
            this.quizService.addQuestionAndChoices(this.questions, q);
          }
        });
    }
  }

  onSubmitQuizResponses(): void {
    if (this.formQuiz.valid) {
      this.redirectToResultsPage();
    }
  }

  redirectToResultsPage(): void {
    this.router.navigate(['/quiz/results'], {
      state: {
        data: this.formQuiz.value
      }
    });
  }
}
