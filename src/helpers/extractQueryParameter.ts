import { parse } from 'query-string'

import { customHistory } from './reachRouterUtils'

export const extractQueryParameter = (
  key: string,
): string | null | undefined => {
  const parsedQueryParameter = parse(customHistory.location.search)[key]

  return Array.isArray(parsedQueryParameter)
    ? parsedQueryParameter.join(',')
    : parsedQueryParameter
}
