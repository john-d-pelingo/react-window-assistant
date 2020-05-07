import {
  camelCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from 'change-case'
import produce from 'immer'
import { lowerCase } from 'lower-case'
import { lowerCaseFirst } from 'lower-case-first'
import { swapCase } from 'swap-case'
import { titleCase } from 'title-case'
import { upperCase } from 'upper-case'
import { upperCaseFirst } from 'upper-case-first'

import {
  SET_CAMEL_CASE,
  SET_CONSTANT_CASE,
  SET_DOT_CASE,
  SET_HEADER_CASE,
  SET_LOWER_CASE,
  SET_LOWER_FIRST_CASE,
  SET_NO_CASE,
  SET_PARAM_CASE,
  SET_PASCAL_CASE,
  SET_PATH_CASE,
  SET_SARCASM_LOWER_FIRST_CASE,
  SET_SARCASM_UPPER_FIRST_CASE,
  SET_SENTENCE_CASE,
  SET_SNAKE_CASE,
  SET_SWAP_CASE,
  SET_TEXT,
  SET_TITLE_CASE,
  SET_UPPER_CASE,
  SET_UPPER_FIRST_CASE,
} from './actions'
import { RootActions } from './types'

import { sarcasmCase } from '../sarcasmCase'

export interface TextConverterState {
  text?: string
}

const textConverterInitialState: TextConverterState = {
  text: undefined,
}

export const textConverterReducer = (
  state: TextConverterState = textConverterInitialState,
  action: RootActions,
): TextConverterState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_CAMEL_CASE:
        draft.text = camelCase(action.payload.text)
        break

      case SET_CONSTANT_CASE:
        draft.text = constantCase(action.payload.text)
        break

      case SET_DOT_CASE:
        draft.text = dotCase(action.payload.text)
        break

      case SET_HEADER_CASE:
        draft.text = headerCase(action.payload.text)
        break

      case SET_LOWER_CASE:
        draft.text = lowerCase(action.payload.text)
        break

      case SET_LOWER_FIRST_CASE:
        draft.text = lowerCaseFirst(action.payload.text)
        break

      case SET_NO_CASE:
        draft.text = noCase(action.payload.text)
        break

      case SET_PARAM_CASE:
        draft.text = paramCase(action.payload.text)
        break

      case SET_PASCAL_CASE:
        draft.text = pascalCase(action.payload.text)
        break

      case SET_PATH_CASE:
        draft.text = pathCase(action.payload.text)
        break

      case SET_SARCASM_LOWER_FIRST_CASE:
        draft.text = sarcasmCase(action.payload.text, 0)
        break

      case SET_SARCASM_UPPER_FIRST_CASE:
        draft.text = sarcasmCase(action.payload.text, 1)
        break

      case SET_SENTENCE_CASE:
        draft.text = sentenceCase(action.payload.text)
        break

      case SET_SNAKE_CASE:
        draft.text = snakeCase(action.payload.text)
        break

      case SET_SWAP_CASE:
        draft.text = swapCase(action.payload.text)
        break

      case SET_TITLE_CASE:
        draft.text = titleCase(action.payload.text)
        break

      case SET_UPPER_CASE:
        draft.text = upperCase(action.payload.text)
        break

      case SET_UPPER_FIRST_CASE:
        draft.text = upperCaseFirst(action.payload.text)
        break

      case SET_TEXT:
        draft.text = action.payload.text
        break
    }
  })
}
