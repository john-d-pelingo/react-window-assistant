// TODO: use better redux folder structure
import { KeyboardEvent } from 'react'

export const BLUR = 'BLUR'
export const FOCUS = 'FOCUS'
export const RESET_KEY_CODE = 'RESET_KEY_CODE'
export const SET_NEW_KEY_CODE = 'SET_NEW_KEY_CODE'

export interface IKeyCodeState {
  isBlurred: boolean
  newKey: string
  newKeyCode: null | string
}

export type IPotentialKeyCodes = Pick<KeyboardEvent, 'key' | 'which'>

export interface IBlurAction {
  type: typeof BLUR
}

export interface IFocusAction {
  type: typeof FOCUS
}

export interface IResetKeyCodeAction {
  type: typeof RESET_KEY_CODE
}

export interface ISetNewKeyCode {
  type: typeof SET_NEW_KEY_CODE
  payload: {
    key: string
    keyCode: string
  }
}

export type KeyCodeActionTypes =
  | IBlurAction
  | IFocusAction
  | IResetKeyCodeAction
  | ISetNewKeyCode
