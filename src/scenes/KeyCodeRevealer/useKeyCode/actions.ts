export const BLUR = 'BLUR'
export const FOCUS = 'FOCUS'
export const RESET_KEY_CODE = 'RESET_KEY_CODE'
export const SET_NEW_KEY_CODE = 'SET_NEW_KEY_CODE'

export interface BlurAction {
  type: typeof BLUR
}

export const blur = (): BlurAction => ({
  type: BLUR,
})

export interface SetNewKeyCode {
  type: typeof SET_NEW_KEY_CODE
  payload: {
    key: string
    keyCode: string
  }
}

export const setNewKeyCode = ({
  key,
  keyCode,
}: {
  key: string
  keyCode: string
}): SetNewKeyCode => ({
  payload: {
    key,
    keyCode,
  },
  type: SET_NEW_KEY_CODE,
})

export interface ResetKeyCodeAction {
  type: typeof RESET_KEY_CODE
}

export const resetKeyCode = (): ResetKeyCodeAction => ({
  type: RESET_KEY_CODE,
})

export interface FocusAction {
  type: typeof FOCUS
}

export const focus = (): FocusAction => ({
  type: FOCUS,
})

export type KeyCodeActionTypes =
  | BlurAction
  | FocusAction
  | ResetKeyCodeAction
  | SetNewKeyCode
