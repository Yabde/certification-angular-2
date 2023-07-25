import {TriviaQuestion} from "./trivia-question";

export interface TriviaQuestionApiResponse {
  response_code: number;
  results: TriviaQuestion[];
}
