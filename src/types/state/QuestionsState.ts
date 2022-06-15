import { ChoiceQuestion } from '../question_types/ChoiceQuestion'
import { TypeQuestion } from '../question_types/TypeQuestion'

export interface QuestionsState {
  questions: (ChoiceQuestion | TypeQuestion)[]
}
