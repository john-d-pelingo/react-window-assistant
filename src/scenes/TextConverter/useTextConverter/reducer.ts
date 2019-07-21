import produce from 'immer'

import { SET_CAMEL_CASE } from './actions'
import { RootActions } from './types'

import changeCase from 'change-case'

export interface ITextConverterState {
  text: string
}

const textConverterInitialState: ITextConverterState = {
  text: '',
}

export const textConverterReducer = (
  state: ITextConverterState = textConverterInitialState,
  action: RootActions,
): ITextConverterState => {
  return produce(state, draft => {
    // TODO: add rest of cases
    switch (action.type) {
      case SET_CAMEL_CASE:
        draft.text = changeCase.camelCase(action.payload.text)
        break
    }
  })
}
