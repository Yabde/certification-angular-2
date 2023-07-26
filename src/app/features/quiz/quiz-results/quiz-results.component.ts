import {Component, OnInit} from '@angular/core';
import {FormQuizValue} from "../../../shared/models/domain/interfaces/form-quiz-value";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit{

  formQuizzValueSubmitted: FormQuizValue;
  correctResponse = 0;
  totalResponse = 0;

  constructor(private quizService: QuizService,
              private fb: FormBuilder,
              private router: Router) {
    this.formQuizzValueSubmitted = this.router.getCurrentNavigation()?.extras.state?.["data"];
  }

  ngOnInit(): void {
    this.redirectIfNoData();
    this.computeScore();
  }

  computeScore() {
    if (this.formQuizzValueSubmitted) {
      this.totalResponse = this.formQuizzValueSubmitted.questions.length;
      this.correctResponse = this.formQuizzValueSubmitted.questions
        .map(value => value.selectedChoice === value.correctAnswer)
        .filter(value => value)
        .length;
    }
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
