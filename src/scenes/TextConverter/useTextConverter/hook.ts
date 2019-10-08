import { useReducer } from 'react'

import { ITextConverterState, textConverterReducer } from './reducer'

export const useTextConverter = (initialState: ITextConverterState) => {
  const [state, dispatch] = useReducer(textConverterReducer, initialState)

  return {
    dispatch,
    text: state.text,
  }
}
