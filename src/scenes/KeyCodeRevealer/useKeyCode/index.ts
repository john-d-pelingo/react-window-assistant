import { produce } from 'immer'
import { KeyboardEvent, RefObject, useEffect, useReducer, useRef } from 'react'

import { keyCodes } from '../keyCodes'
import {
  BLUR,
  blur,
  FOCUS,
  focus,
  KeyCodeActionTypes,
  RESET_KEY_CODE,
  resetKeyCode as resetKeyCodeAction,
  SET_NEW_KEY_CODE,
  setNewKeyCode as setNewKeyCodeAction,
} from './actions'

export interface KeyCodeState {
  isBlurred: boolean
  newKey: string
  newKeyCode?: string
}

function reducer(
  state: KeyCodeState,
  action: KeyCodeActionTypes,
): KeyCodeState {
  return produce(state, (draft) => {
    switch (action.type) {
      case BLUR:
        draft.isBlurred = true
        break

      case RESET_KEY_CODE:
        draft.newKeyCode = ''
        draft.newKey = ''
        break

      case SET_NEW_KEY_CODE:
        draft.newKey = action.payload.key
        draft.newKeyCode = action.payload.keyCode
        break

      case FOCUS:
        draft.isBlurred = false
        break
    }
  })
}

type KeyCode = Pick<KeyboardEvent, 'key' | 'which'>

export function useKeyCode<T extends HTMLElement>(
  initialState: KeyCodeState,
): {
  appElement: RefObject<T>
  blurElement: () => void
  focusElement: () => void
  newKey: string
  newKeyCode: string | undefined
  resetKeyCode: () => void
  setNewKeyCode: (newKeyCode: KeyCode) => void
} {
  const appElement = useRef<T>(null)

  const [{ isBlurred, newKey, newKeyCode }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const blurElement = () => {
    if (!isBlurred) {
      dispatch(blur())
    }
  }

  const focusElement = () => {
    if (isBlurred) {
      dispatch(focus())
    }
  }

  const resetKeyCode = () => {
    dispatch(resetKeyCodeAction())
  }

  const setNewKeyCode = (newKeyCode: KeyCode) => {
    const keyCode = newKeyCode.which
    const key = keyCodes[keyCode]
      ? keyCodes[keyCode]
      : newKeyCode.key.toLowerCase()

    dispatch(
      setNewKeyCodeAction({
        key,
        keyCode: String(keyCode),
      }),
    )
  }

  const focusAppElement = () => {
    if (appElement.current) {
      appElement.current.focus()
    }
  }

  useEffect(() => {
    if (isBlurred) {
      focusAppElement()
    }
  }, [isBlurred])

  return {
    appElement,
    blurElement,
    focusElement,
    newKey,
    newKeyCode,
    resetKeyCode,
    setNewKeyCode,
  }
}
