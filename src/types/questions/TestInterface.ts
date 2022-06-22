export interface AllQuestionProps {
  id: number;
  type: string;
  question: string;
  options: string[];
  answer: string;
  valueType: string;
  placeholder: string;
  result?: string
  userRespondedCorrectly?: boolean
}

export type OptionQuestion = Omit<AllQuestionProps, 'placeholder'>

export type WordQuestion = Omit<AllQuestionProps, 'valueType' | 'options'>

export type AllQuestionTypes = (OptionQuestion | WordQuestion)[]
