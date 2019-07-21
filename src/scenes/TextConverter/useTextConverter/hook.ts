import { useReducer } from 'react'

import { ITextConverterState, textConverterReducer } from './reducer'

// TODO: maybe a custom hook is not needed
export const useTextConverter = (initialState: ITextConverterState) => {
  const [state, dispatch] = useReducer(textConverterReducer, initialState)

  return {
    dispatch,
    text: state.text,
  }
}
