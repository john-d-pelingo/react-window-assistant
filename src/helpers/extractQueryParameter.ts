import { parse } from 'query-string'
import { globalHistory } from '@reach/router'

export const extractQueryParameter = (
  queryParameter: string,
): string | null | undefined => {
  const parsedQueryParameter = parse(globalHistory.location.search)[
    queryParameter
  ]

  return Array.isArray(parsedQueryParameter)
    ? parsedQueryParameter.join(',')
    : parsedQueryParameter
}
