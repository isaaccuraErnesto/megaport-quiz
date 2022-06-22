import { QuestionTypes } from '@/enums/QuestionTypes'

export interface BaseQuestion {
  id: number
  type: QuestionTypes
  question: string
  answer: string
  result?: string
  userRespondedCorrectly?: boolean
}
