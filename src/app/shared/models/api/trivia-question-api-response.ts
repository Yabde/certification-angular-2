import {TriviaQuestion} from "../domain/interfaces/trivia-question";

export interface TriviaQuestionApiResponse {
  response_code: number;
  results: TriviaQuestion[];
}
