import { stringify } from 'query-string'

import { customHistory } from './reachRouterUtils'

export const appendQueryParameter = (key: string, value: string): void => {
  const queryString = stringify({
    [key]: value,
  })

  customHistory.navigate(`?${queryString}`)
}
