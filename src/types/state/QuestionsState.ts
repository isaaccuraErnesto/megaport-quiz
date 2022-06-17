import { ChoiceQuestion } from '../questions/ChoiceQuestion'
import { TypeQuestion } from '../questions/TypeQuestion'

export interface QuestionsState {
  questions: (ChoiceQuestion | TypeQuestion)[]
}
