import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DifficultyType} from "../../../../shared/models/domain/types/difficulty.type";
import {TriviaCategory} from "../../../../shared/models/domain/interfaces/trivia-category";
import {Subscription} from "rxjs";

export interface QuizzSelectForm {
  category: number;
  difficulty: DifficultyType;
}

@Component({
  selector: 'app-quiz-select-form',
  templateUrl: './quiz-select-form.component.html'
})
export class QuizSelectFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  form: FormGroup = new FormGroup({
    category: new FormControl('', [Validators.required]),
    difficulty: new FormControl('')
  });

  @Input() triviaDifficulties: DifficultyType[] = ['easy', 'medium', 'hard'];
  @Input() triviaCategories: TriviaCategory[] = [];

  @Output() difficultyEmitter = new EventEmitter<DifficultyType>();
  @Output() categoryEmitter = new EventEmitter<number>();
  @Output() submitFormEmitter = new EventEmitter<QuizzSelectForm>();

  ngOnInit(): void {
    this.subscriptions.push(this.difficulty.valueChanges.subscribe(diff => {
      this.difficultyEmitter.emit(diff);
    }));
    this.subscriptions.push(this.category.valueChanges.subscribe(cat => {
      this.categoryEmitter.emit(cat);
    }));
  }

  get difficulty(): FormControl {
    return this.form.get('difficulty') as FormControl;
  }

  get category(): FormControl {
    return this.form.get('category') as FormControl;
  }

  submit(): void {
    this.submitFormEmitter.emit(this.form.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
