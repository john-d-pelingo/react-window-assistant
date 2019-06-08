import { globalHistory } from '@reach/router'

import { appendQueryParameter } from '../appendQueryParameter'

describe('helpers - appendQueryParameter', () => {
  it('appends the query parameter "query" into the hash', () => {
    expect(globalHistory.location.pathname).toBe('/')
    expect(globalHistory.location.search).toBe('')

    appendQueryParameter('hello-word')

    expect(globalHistory.location.search).toBe('?query=hello-word')
  })
})
