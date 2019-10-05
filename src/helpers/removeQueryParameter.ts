import { History } from 'history'
import { parse, stringify } from 'query-string'

export const removeQueryParameter = ({
  history,
  key,
}: {
  history: History
  key: string
}): void => {
  const queryParameters = parse(history.location.search)
  delete queryParameters[key]
  const queryString = stringify(queryParameters)

  history.push(`?${queryString}`)
}
