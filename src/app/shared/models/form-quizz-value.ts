export interface FormQuizzValue {
  questions: FormQuizzQuestionValue[];
}

export interface FormQuizzQuestionValue {
  question: string;
  choices: string[];
  selectedChoice: string;
  correctAnswer: string;
}
