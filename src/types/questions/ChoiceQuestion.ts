import { BaseQuestion } from './BaseQuestion'

export interface ChoiceQuestion extends BaseQuestion {
  options: string[]
  valueType: string
}
