export const camel = 'camel' as const
export const SET_CAMEL_CASE = 'SET_CAMEL_CASE'
export const constant = 'constant' as const
export const SET_CONSTANT_CASE = 'SET_CONSTANT_CASE'
export const dot = 'dot' as const
export const SET_DOT_CASE = 'SET_DOT_CASE'
export const header = 'header' as const
export const SET_HEADER_CASE = 'SET_HEADER_CASE'
export const lower = 'lower' as const
export const SET_LOWER_CASE = 'SET_LOWER_CASE'
export const lowerFirst = 'lowerFirst' as const
export const SET_LOWER_FIRST_CASE = 'SET_LOWER_FIRST_CASE'
export const no = 'no' as const
export const SET_NO_CASE = 'SET_NO_CASE'
export const param = 'param' as const
export const SET_PARAM_CASE = 'SET_PARAM_CASE'
export const pascal = 'pascal' as const
export const SET_PASCAL_CASE = 'SET_PASCAL_CASE'
export const path = 'path' as const
export const SET_PATH_CASE = 'SET_PATH_CASE'
export const sarcasmLowerFirst = 'sarcasmLowerFirst' as const
export const SET_SARCASM_LOWER_FIRST_CASE = 'SET_SARCASM_LOWER_FIRST_CASE'
export const sarcasmUpperFirst = 'sarcasmUpperFirst' as const
export const SET_SARCASM_UPPER_FIRST_CASE = 'SET_SARCASM_UPPER_FIRST_CASE'
export const sentence = 'sentence' as const
export const SET_SENTENCE_CASE = 'SET_SENTENCE_CASE'
export const snake = 'snake' as const
export const SET_SNAKE_CASE = 'SET_SNAKE_CASE'
export const swap = 'swap' as const
export const SET_SWAP_CASE = 'SET_SWAP_CASE'
export const title = 'title' as const
export const SET_TITLE_CASE = 'SET_TITLE_CASE'
export const upper = 'upper' as const
export const SET_UPPER_CASE = 'SET_UPPER_CASE'
export const upperFirst = 'upperFirst' as const
export const SET_UPPER_FIRST_CASE = 'SET_UPPER_FIRST_CASE'

type SetCaseActionType =
  | typeof SET_CAMEL_CASE
  | typeof SET_CONSTANT_CASE
  | typeof SET_DOT_CASE
  | typeof SET_HEADER_CASE
  | typeof SET_LOWER_CASE
  | typeof SET_LOWER_FIRST_CASE
  | typeof SET_NO_CASE
  | typeof SET_PARAM_CASE
  | typeof SET_PASCAL_CASE
  | typeof SET_PATH_CASE
  | typeof SET_SARCASM_LOWER_FIRST_CASE
  | typeof SET_SARCASM_UPPER_FIRST_CASE
  | typeof SET_SENTENCE_CASE
  | typeof SET_SNAKE_CASE
  | typeof SET_SWAP_CASE
  | typeof SET_TITLE_CASE
  | typeof SET_UPPER_CASE
  | typeof SET_UPPER_FIRST_CASE

export type Case =
  | typeof camel
  | typeof constant
  | typeof dot
  | typeof header
  | typeof lower
  | typeof lowerFirst
  | typeof no
  | typeof param
  | typeof pascal
  | typeof path
  | typeof sarcasmLowerFirst
  | typeof sarcasmUpperFirst
  | typeof sentence
  | typeof snake
  | typeof swap
  | typeof title
  | typeof upper
  | typeof upperFirst

export const cases: { [key in Case]: SetCaseActionType } = {
  [camel]: SET_CAMEL_CASE,
  [constant]: SET_CONSTANT_CASE,
  [dot]: SET_DOT_CASE,
  [header]: SET_HEADER_CASE,
  [lower]: SET_LOWER_CASE,
  [lowerFirst]: SET_LOWER_FIRST_CASE,
  [no]: SET_NO_CASE,
  [param]: SET_PARAM_CASE,
  [pascal]: SET_PASCAL_CASE,
  [path]: SET_PATH_CASE,
  [sarcasmLowerFirst]: SET_SARCASM_LOWER_FIRST_CASE,
  [sarcasmUpperFirst]: SET_SARCASM_UPPER_FIRST_CASE,
  [sentence]: SET_SENTENCE_CASE,
  [snake]: SET_SNAKE_CASE,
  [swap]: SET_SWAP_CASE,
  [title]: SET_TITLE_CASE,
  [upper]: SET_UPPER_CASE,
  [upperFirst]: SET_UPPER_FIRST_CASE,
}

interface SetCaseAction {
  payload: {
    text: string
  }
  type: SetCaseActionType
}

export const setCase = (
  text: string | undefined,
  textCase: Case,
): SetCaseAction => ({
  payload: {
    text: text ? text : '',
  },
  type: cases[textCase],
})

export const SET_TEXT = 'SET_TEXT'

interface SetTextAction {
  payload: {
    text: string
  }
  type: typeof SET_TEXT
}

export const setText = (text: string): SetTextAction => ({
  payload: {
    text,
  },
  type: SET_TEXT,
})

export type TextConvertActions = SetCaseAction | SetTextAction
