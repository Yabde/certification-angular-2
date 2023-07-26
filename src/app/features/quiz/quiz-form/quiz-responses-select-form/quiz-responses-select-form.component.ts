import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {QuizService} from "../../services/quiz.service";
import {TriviaQuestion} from "../../../../shared/models/domain/interfaces/trivia-question";
import {FormQuizValue} from "../../../../shared/models/domain/interfaces/form-quiz-value";

@Component({
  selector: 'app-quiz-responses-select-form',
  templateUrl: './quiz-responses-select-form.component.html',
  styleUrls: ['./quiz-responses-select-form.component.scss']
})
export class QuizResponsesSelectFormComponent implements OnInit {

  formQuiz!: FormGroup;

  @Input() triviaQuestions: TriviaQuestion[] = [];

  @Input() formDesactivated = false;
  @Input() formQuizQuestionValue!: FormQuizValue;

  @Output() submitFormEmitter = new EventEmitter<FormQuizValue>();

  constructor(private quizService: QuizService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formQuiz = this.fb.group({
      questions: this.fb.array([])
    })

    this.buildFormQuizz();
  }

  get questions(): FormArray<FormGroup> {
    return this.formQuiz.get('questions') as FormArray<FormGroup>;
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

  buildFormQuizz() {
    if (this.formQuizQuestionValue && this.formQuizQuestionValue.questions.length > 0) {
      this.quizService.rebuildFormFromValue(this.questions, this.formQuizQuestionValue.questions, true);
    } else {
      for (let q of this.triviaQuestions) {
        this.quizService.addQuestionAndChoices(this.questions, q);
      }
    }
  }

  getButtonCssClass(choice: string, correct: string, selected: string) {
    if (this.formDesactivated) {
      return {
        'btn-error-custom': choice !== correct
          && !(selected === correct)
          && choice === selected,
        'btn-success-custom': choice === correct
      }
    }
    return;
  }

  onSubmitQuizResponses(): void {
    if (this.formQuiz.valid) {
      this.submitFormEmitter.emit(this.formQuiz.value);
    }
  }
}
