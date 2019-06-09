import { appendQueryParameter } from '../appendQueryParameter'
import { customHistory } from '../reachRouterUtils'

// NOTE: uncomment to activate the manual mock at ../__mocks__/reachRouterUtils.ts
// jest.mock('../reachRouterUtils')

describe('helpers - appendQueryParameter', () => {
  beforeEach(() => {
    customHistory.navigate('/')
  })

  it('appends the query parameter to the search', () => {
    expect(customHistory.location.pathname).toBe('/')
    expect(customHistory.location.search).toBe('')

    appendQueryParameter('text', 'hello-word')

    expect(customHistory.location.pathname).toBe('/')
    expect(customHistory.location.search).toBe('?text=hello-word')
  })
})
