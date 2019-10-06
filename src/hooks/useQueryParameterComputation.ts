import debounce from 'debounce'
import { History } from 'history'
import { useEffect } from 'react'

import { appendQueryParameter } from 'helpers/appendQueryParameter'
import { removeQueryParameter } from 'helpers/removeQueryParameter'

const debouncedAppendQueryParameter =
  process.env.NODE_ENV === 'test'
    ? appendQueryParameter
    : debounce(appendQueryParameter, 200)
const debouncedRemoveQueryParameter =
  process.env.NODE_ENV === 'test'
    ? removeQueryParameter
    : debounce(removeQueryParameter, 200)

export const useQueryParameterComputation = ({
  history,
  key,
  value,
}: {
  history: History
  key: string
  value: string | undefined
}) => {
  useEffect(() => {
    if (value === undefined) {
      return
    }

    if (!value || value.trim().length === 0) {
      debouncedRemoveQueryParameter({
        history,
        key,
      })
      return
    }

    debouncedAppendQueryParameter({
      history,
      key,
      value,
    })
  }, [key, value, history])
}
