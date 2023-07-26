import {Component, OnInit} from '@angular/core';
import {FormQuizzValue} from "../../../shared/models/domain/interfaces/form-quizz-value";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit{

  formQuizzSubmitted!: FormGroup;
  formQuizzValueSubmitted: FormQuizzValue;
  correctResponse = 0;
  totalResponse = 0;

  constructor(private quizService: QuizService,
              private fb: FormBuilder,
              private router: Router) {
    this.formQuizzValueSubmitted = this.router.getCurrentNavigation()?.extras.state?.["data"];
  }

  ngOnInit(): void {
    this.redirectIfNoData();

    this.formQuizzSubmitted = this.fb.group({
      questions: this.fb.array([])
    })

    this.buildForm();
  }

  get questions(): FormArray<FormGroup> {
    return this.formQuizzSubmitted.get('questions') as FormArray<FormGroup>;
  }

  choices(formGroup: FormGroup): string[] {
    return formGroup.get('choices')?.value;
  }

  correctAnswer(formGroup: FormGroup): string {
    return formGroup.get('correctAnswer')?.value;
  }

  selectedChoice(formGroup: FormGroup): string {
    return formGroup.get('selectedChoice')?.value;
  }

  buildForm(): void {
    if (this.formQuizzValueSubmitted) {
      this.quizService.rebuildFormFromValue(this.questions, this.formQuizzValueSubmitted.questions, true);
    }

    this.computeScore();
  }

  computeScore() {
    this.totalResponse = this.formQuizzValueSubmitted.questions.length;
    this.correctResponse = this.formQuizzValueSubmitted.questions
      .map(value => value.selectedChoice === value.correctAnswer)
      .filter(value => value)
      .length;
  }

  redirectToQuizPage(): void {
    this.router.navigate(['/quiz']);
  }

  redirectIfNoData(): void {
    if (!this.formQuizzValueSubmitted) {
      this.redirectToQuizPage();
    }
  }
}
