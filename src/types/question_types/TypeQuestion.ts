import { QuestionTypes } from '@/enums/QuestionTypes'

export interface TypeQuestion {
  id: number
  type: QuestionTypes
  question: string
  placeholder: string
  answer: string
}
