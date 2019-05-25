import { stringify } from 'query-string'

import { urlInterpreter } from '../consants/routes'
import { urlInterpreterQueryParameter } from '../consants/strings'

export const appendQueryParameter = (queryParameter: string): void => {
  const queryString = stringify({
    [urlInterpreterQueryParameter]: queryParameter,
  })

  window.history.pushState({}, '', `/#${urlInterpreter}?${queryString}`)
  // window.history.pushState({}, '', `?${queryString}/#${urlInterpreter}`)
}
