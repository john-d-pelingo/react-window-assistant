import { produce } from 'immer'
import { useEffect, useReducer, useRef } from 'react'

import { keyCodes } from '../keyCodes'
import { blur, focus, resetKeyCode, setNewKeyCode } from './actions'
import {
  BLUR,
  FOCUS,
  IKeyCodeState,
  IPotentialKeyCodes,
  KeyCodeActionTypes,
  RESET_KEY_CODE,
  SET_NEW_KEY_CODE,
} from './types'

function reducer(
  state: IKeyCodeState,
  action: KeyCodeActionTypes,
): IKeyCodeState {
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

export function useKeyCode<T extends HTMLElement>(initialState: IKeyCodeState) {
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

  const handleKeyDown = (potentialKeyCode: IPotentialKeyCodes) => {
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
