import { parse } from 'query-string'
import { globalHistory } from '@reach/router'

export const extractQueryParameter = (
  key: string,
): string | null | undefined => {
  const parsedQueryParameter = parse(globalHistory.location.search)[key]

  return Array.isArray(parsedQueryParameter)
    ? parsedQueryParameter.join(',')
    : parsedQueryParameter
}
