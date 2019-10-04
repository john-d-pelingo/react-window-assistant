import { produce } from 'immer'
import { KeyboardEvent, useEffect, useReducer, useRef } from 'react'

import { keyCodes } from '../keyCodes'
import {
  BLUR,
  blur,
  FOCUS,
  focus,
  KeyCodeActionTypes,
  RESET_KEY_CODE,
  resetKeyCode,
  SET_NEW_KEY_CODE,
  setNewKeyCode,
} from './actions'

export interface KeyCodeState {
  isBlurred: boolean
  newKey: string
  newKeyCode: null | string
}

function reducer(
  state: KeyCodeState,
  action: KeyCodeActionTypes,
): KeyCodeState {
  return produce(state, draft => {
    switch (action.type) {
      case BLUR:
        draft.isBlurred = true
        break

      case RESET_KEY_CODE:
        draft.newKeyCode = null
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

type PotentialKeyCodes = Pick<KeyboardEvent, 'key' | 'which'>

export function useKeyCode<T extends HTMLElement>(initialState: KeyCodeState) {
  const appElement = useRef<T>(null)

  const [{ isBlurred, newKey, newKeyCode }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const handleBlur = () => {
    if (!isBlurred) {
      dispatch(blur())
    }
  }

  const handleFocus = () => {
    if (isBlurred) {
      dispatch(focus())
    }
  }

  const handleClick = () => {
    dispatch(resetKeyCode())
  }

  const handleKeyDown = (potentialKeyCode: PotentialKeyCodes) => {
    const keyCode = potentialKeyCode.which
    const key = keyCodes[keyCode]
      ? keyCodes[keyCode]
      : potentialKeyCode.key.toLowerCase()

    dispatch(
      setNewKeyCode({
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
    handleBlur,
    handleClick,
    handleFocus,
    handleKeyDown,
    newKey,
    newKeyCode,
  }
}
