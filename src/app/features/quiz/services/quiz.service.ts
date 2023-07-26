import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TriviaCategory} from "../../../shared/models/domain/interfaces/trivia-category";
import {map, Observable, tap} from "rxjs";
import {TriviaCategoryApiResponse} from "../../../shared/models/api/trivia-category-api-response";
import {TriviaQuestionApiResponse} from "../../../shared/models/api/trivia-question-api-response";
import {DifficultyType} from "../../../shared/models/domain/types/difficulty.type";
import {hasOneChoiceSelectedValidator} from "../../../shared/validators/quiz-one-choice-selected-validator";
import {FormArray, FormBuilder} from "@angular/forms";
import {TriviaQuestion} from "../../../shared/models/domain/interfaces/trivia-question";
import {FormQuizzQuestionValue} from "../../../shared/models/domain/interfaces/form-quizz-value";
import {shuffle} from "../../../shared/utils/utils";

@Injectable()
export class QuizService {

  API_URL = 'https://opentdb.com';
  CATEGORY_ENDPOINT = '/api_category.php';
  QUESTIONS_ENDPOINT = '/api.php'

  constructor(private httpService: HttpClient,
              private fb: FormBuilder) { }


  /////////////////////////////////
  /////////    API   //////////////
  /////////////////////////////////

  getCategory(): Observable<TriviaCategory[]> {
    const url = this.API_URL + this.CATEGORY_ENDPOINT;
    return this.httpService.get<TriviaCategoryApiResponse>(url).pipe(
      map((data: TriviaCategoryApiResponse) => data.trivia_categories)
    );
  }

  getQuestions(category: number, difficulty: DifficultyType) {
    const url = this.API_URL + this.QUESTIONS_ENDPOINT;
    const params = {
      amount: 5,
      category: 11,
      difficulty: 'easy',
      type: 'multiple'
    }
    return this.httpService.get<TriviaQuestionApiResponse>(url, { params: params }).pipe(
      tap(data => console.log(data)),
      map((data: TriviaQuestionApiResponse) => {
        let triviaQuestions = data.results;
        for (let q of triviaQuestions) {
          q.all_answers = [];
          q.all_answers = [...q.incorrect_answers, q.correct_answer];
        }
        return triviaQuestions;
      })
    );
  }

  /////////////////////////////////
  /////////    others   ///////////
  /////////////////////////////////

  addQuestionAndChoices(formArray: FormArray, triviaQuestion: TriviaQuestion) {
    let question = triviaQuestion.question;
    let correctAnswer = triviaQuestion.correct_answer;
    let choices = [...triviaQuestion.incorrect_answers, triviaQuestion.correct_answer];;

    choices = this.shuffleArray(choices);

    const questionChoicesGroup = this.fb.group(
      {
        question: [question],
        correctAnswer: [correctAnswer],
        choices: [choices],
        selectedChoice: ['']
      },
      { validators: hasOneChoiceSelectedValidator<string>('selectedChoice') }
    );

    formArray.push(questionChoicesGroup);
  }

  rebuildFormFromValue(formArray: FormArray, questionValue: FormQuizzQuestionValue[], disabled = false) {
    questionValue.forEach(questionValue => {
      let choices = this.shuffleArray(questionValue.choices);

      const questionChoicesGroup = this.fb.group(
        {
          question: [questionValue.question],
          correctAnswer: [questionValue.correctAnswer],
          choices: [choices],
          selectedChoice: [{value: questionValue.selectedChoice, disabled}]
        },
        { validators: hasOneChoiceSelectedValidator<string>('selectedChoice') }
      );

      formArray.push(questionChoicesGroup);
    })
  }

  private shuffleArray(strArr: string[]): string[] {
    return shuffle(strArr);
  }
}
