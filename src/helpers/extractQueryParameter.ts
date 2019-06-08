import { Search } from 'history'
import { parse } from 'query-string'

export const extractQueryParameter = (
  search: string & Search,
  queyrParameter: string,
): string | null | undefined => {
  const queryParameter = parse(search)[queyrParameter]

  return Array.isArray(queryParameter)
    ? queryParameter.join(',')
    : queryParameter
}
