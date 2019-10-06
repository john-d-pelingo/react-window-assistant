import { createMemoryHistory } from 'history'

import { appendQueryParameter } from '../appendQueryParameter'

let memoryHistory = createMemoryHistory()

describe('helpers - appendQueryParameter', () => {
  beforeEach(() => {
    memoryHistory = createMemoryHistory()
  })

  it('appends the query parameter to the search', () => {
    expect(memoryHistory.location.pathname).toBe('/')
    expect(memoryHistory.location.search).toBe('')

    appendQueryParameter({
      history: memoryHistory,
      key: 'text',
      value: 'hello-word',
    })

    expect(memoryHistory.location.pathname).toBe('/')
    expect(memoryHistory.location.search).toBe('?text=hello-word')
  })

  // TODO: add test that doesn't remove other parameters
})
