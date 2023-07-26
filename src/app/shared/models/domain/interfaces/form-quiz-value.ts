export interface FormQuizValue {
  questions: FormQuizQuestionValue[];
}

export interface FormQuizQuestionValue {
  question: string;
  choices: string[];
  selectedChoice: string;
  correctAnswer: string;
}
