import { parse } from 'query-string'

import { urlInterpreterQueryParameter } from 'consants/strings'
import { hashHistory } from 'helpers/reachRouterUtils'

export const extractQueryParameter = (): string | null | undefined => {
  const { pathname } = hashHistory.location

  if (pathname.charAt(0) === '/') {
    const queryParameterParts = hashHistory.location.pathname.split('?')

    if (queryParameterParts.length < 2) {
      return null
    }

    const queryParameter = parse(queryParameterParts[1])[
      urlInterpreterQueryParameter
    ]

    return Array.isArray(queryParameter)
      ? queryParameter.join(',')
      : queryParameter
  }

  const queryParameter = parse(pathname)[urlInterpreterQueryParameter]

  return Array.isArray(queryParameter)
    ? queryParameter.join(',')
    : queryParameter
}
