import { globalHistory } from '@reach/router'
import { stringify } from 'query-string'

export const appendQueryParameter = (key: string, value: string): void => {
  const queryString = stringify({
    [key]: value,
  })

  globalHistory.navigate(`?${queryString}`)
}
