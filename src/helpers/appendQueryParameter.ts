import { History } from 'history'
import { stringify } from 'query-string'

export const appendQueryParameter = ({
  history,
  key,
  value,
}: {
  history: History
  key: string
  value: string
}): void => {
  const queryString = stringify({
    [key]: value,
  })

  history.push(`?${queryString}`)
}
