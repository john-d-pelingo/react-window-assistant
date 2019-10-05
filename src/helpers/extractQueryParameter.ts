import { History } from 'history'
import { parse } from 'query-string'

export const extractQueryParameter = ({
  history,
  key,
}: {
  history: History
  key: string
}): string | null | undefined => {
  const parsedQueryParameter = parse(history.location.search)[key]

  if (Array.isArray(parsedQueryParameter)) {
    return parsedQueryParameter.join(',')
  }

  if (parsedQueryParameter === undefined || parsedQueryParameter === null) {
    return parsedQueryParameter
  }

  return String(parsedQueryParameter)
}
