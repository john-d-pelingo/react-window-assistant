import { useReducer } from 'react'

import { TextConverterState, textConverterReducer } from './reducer'

export const useTextConverter = (initialState: TextConverterState) => {
  const [state, dispatch] = useReducer(textConverterReducer, initialState)

  return {
    dispatch,
    text: state.text,
  }
}
