import {TypeQuestion} from "../types/type-question.type";
import {DifficultyType} from "../types/difficulty.type";

export interface TriviaQuestion {
  category: string;
  type: TypeQuestion;
  difficulty: DifficultyType;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}
