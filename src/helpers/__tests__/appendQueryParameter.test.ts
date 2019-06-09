import { globalHistory } from '@reach/router'

import { appendQueryParameter } from '../appendQueryParameter'

afterAll(() => {
  globalHistory.location.search = ''
})

// TODO: read "refactor to use my own history"
describe('helpers - appendQueryParameter', () => {
  it('appends the query parameter to the search', () => {
    expect(globalHistory.location.pathname).toBe('/')
    expect(globalHistory.location.search).toBe('')

    appendQueryParameter('text', 'hello-word')

    expect(globalHistory.location.pathname).toBe('/')
    expect(globalHistory.location.search).toBe('?text=hello-word')
  })
})
