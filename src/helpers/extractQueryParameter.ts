import { parse } from 'query-string'

import { customHistory } from './reachRouterUtils'

export const extractQueryParameter = (
  key: string,
): string | null | undefined => {
  const parsedQueryParameter = parse(customHistory.location.search)[key]

  if (Array.isArray(parsedQueryParameter)) {
    return parsedQueryParameter.join(',')
  }

  // tslint:disable-next-line:triple-equals
  if (parsedQueryParameter == undefined) {
    return parsedQueryParameter
  }

  return String(parsedQueryParameter)
}
