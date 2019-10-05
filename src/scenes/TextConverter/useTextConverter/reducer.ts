import produce from 'immer'

import {
  SET_CAMEL_CASE,
  SET_CONSTANT_CASE,
  SET_DOT_CASE,
  SET_HEADER_CASE,
  SET_LOWER_CASE,
  SET_LOWER_FIRST_CASE,
  SET_NO_CASE,
  SET_PARAM_CASE,
  SET_PATH_CASE,
  SET_SARCASM_CASE,
  SET_SENTENCE_CASE,
  SET_SNAKE_CASE,
  SET_SWAP_CASE,
  SET_TEXT,
  SET_TITLE_CASE,
  SET_UPPER_CASE,
  SET_UPPER_FIRST_CASE,
} from './actions'
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
    switch (action.type) {
      case SET_CAMEL_CASE:
        draft.text = changeCase.camel(action.payload.text)
        break

      case SET_CONSTANT_CASE:
        draft.text = changeCase.constant(action.payload.text)
        break

      case SET_DOT_CASE:
        draft.text = changeCase.dot(action.payload.text)
        break

      case SET_HEADER_CASE:
        draft.text = changeCase.header(action.payload.text)
        break

      case SET_LOWER_CASE:
        draft.text = changeCase.lower(action.payload.text)
        break

      case SET_LOWER_FIRST_CASE:
        draft.text = changeCase.lcFirst(action.payload.text)
        break

      case SET_NO_CASE:
        draft.text = changeCase.no(action.payload.text)
        break

      case SET_PARAM_CASE:
        draft.text = changeCase.param(action.payload.text)
        break

      case SET_PATH_CASE:
        draft.text = changeCase.path(action.payload.text)
        break

      // TODO: implement
      case SET_SARCASM_CASE:
        draft.text = action.payload.text
        break

      case SET_SENTENCE_CASE:
        draft.text = changeCase.sentence(action.payload.text)
        break

      case SET_SNAKE_CASE:
        draft.text = changeCase.snake(action.payload.text)
        break

      case SET_SWAP_CASE:
        draft.text = changeCase.swap(action.payload.text)
        break

      case SET_TITLE_CASE:
        draft.text = changeCase.title(action.payload.text)
        break

      case SET_UPPER_CASE:
        draft.text = changeCase.upper(action.payload.text)
        break

      case SET_UPPER_FIRST_CASE:
        draft.text = changeCase.ucFirst(action.payload.text)
        break

      case SET_TEXT:
        draft.text = action.payload.text
        break
    }
  })
}
