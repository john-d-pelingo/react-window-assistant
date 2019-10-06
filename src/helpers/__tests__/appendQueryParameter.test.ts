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

  it(`doesn't delete existing query parameters`, () => {
    expect(memoryHistory.location.pathname).toBe('/')
    expect(memoryHistory.location.search).toBe('')

    memoryHistory.push('?a=b&x=22')

    appendQueryParameter({
      history: memoryHistory,
      key: 'ping',
      value: 'pong¡™£ªº∞ª™º£∞',
    })

    expect(memoryHistory.location.pathname).toBe('/')
    expect(memoryHistory.location.search).toBe(
      '?a=b&ping=pong%C2%A1%E2%84%A2%C2%A3%C2%AA%C2%BA%E2%88%9E%C2%AA%E2%84%A2%C2%BA%C2%A3%E2%88%9E&x=22',
    )
  })

  it('overrides existing previous parameter', () => {
    expect(memoryHistory.location.pathname).toBe('/')
    expect(memoryHistory.location.search).toBe('')

    memoryHistory.push('?marco=solo')

    appendQueryParameter({
      history: memoryHistory,
      key: 'marco',
      value: 'polo',
    })

    expect(memoryHistory.location.pathname).toBe('/')
    expect(memoryHistory.location.search).toBe('?marco=polo')
  })
})
