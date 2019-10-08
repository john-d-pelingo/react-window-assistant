import { History } from 'history'
import { parse, stringify } from 'query-string'

export const appendQueryParameter = ({
  history,
  key,
  value,
}: {
  history: History
  key: string
  value: string
}): void => {
  const queryParameters = parse(history.location.search)
  const queryString = stringify({ ...queryParameters, [key]: value })

  history.push(`?${queryString}`)
}
