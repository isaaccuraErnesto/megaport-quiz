import { QuestionTypes } from '@/enums/QuestionTypes'

export interface ChoiceQuestion {
  id: number
  type: QuestionTypes
  question: string
  options: string[]
  answer: string
  valueType: string
}
