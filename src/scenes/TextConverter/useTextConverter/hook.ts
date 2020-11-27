import { Dispatch, useReducer } from 'react'

import { TextConvertActions } from './actions'
import { TextConverterState, textConverterReducer } from './reducer'

export const useTextConverter = (
  initialState: TextConverterState,
): {
  dispatch: Dispatch<TextConvertActions>
  text: string | undefined
} => {
  const [state, dispatch] = useReducer(textConverterReducer, initialState)

  return {
    dispatch,
    text: state.text,
  }
}
