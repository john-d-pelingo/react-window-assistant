import { globalHistory } from '@reach/router'
import { stringify } from 'query-string'

import { urlInterpreterQueryParameter } from '../consants/strings'

export const appendQueryParameter = (queryParameter: string): void => {
  const queryString = stringify({
    [urlInterpreterQueryParameter]: queryParameter,
  })

  globalHistory.navigate(`?${queryString}`)
}
