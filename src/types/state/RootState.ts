import { QuestionsState } from './QuestionsState'
import { UiChangersState } from './UiChangersState'
import { UpdateQuestionsState } from './UpdateQuestionsState'
import { UserInfoState } from './UserInfoState'

export interface RootState {
  userInfo: UserInfoState
  questions: QuestionsState
  updateQuestions: UpdateQuestionsState
  uiChangers: UiChangersState
}
