import {
  BLUR,
  FOCUS,
  KeyCodeActionTypes,
  RESET_KEY_CODE,
  SET_NEW_KEY_CODE,
} from './types'

export const blur = (): KeyCodeActionTypes => ({
  type: BLUR,
})

export const setNewKeyCode = ({
  key,
  keyCode,
}: {
  key: string
  keyCode: string
}): KeyCodeActionTypes => ({
  payload: {
    key,
    keyCode,
  },
  type: SET_NEW_KEY_CODE,
})

export const resetKeyCode = (): KeyCodeActionTypes => ({
  type: RESET_KEY_CODE,
})

export const focus = (): KeyCodeActionTypes => ({
  type: FOCUS,
})
