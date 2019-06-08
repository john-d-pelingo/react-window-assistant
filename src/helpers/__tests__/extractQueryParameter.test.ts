// @ts-ignore
// TODO: fix by not using the `#`
describe.skip('helpers - extractQueryParameter', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('returns null when the pathname is "/"', () => {
    jest.mock('@reach/router', () => ({
      createHistory: jest.fn(() => ({
        location: { pathname: '/' },
      })),
    }))

    const { extractQueryParameter } = require('../extractQueryParameter')

    const queryParameter = extractQueryParameter()

    expect(queryParameter).toBeNull()
  })

  it('returns undefined when the query key "query" is not supplied', () => {
    jest.mock('@reach/router', () => ({
      createHistory: jest.fn(() => ({
        location: { pathname: 'customer=42' },
      })),
    }))

    const { extractQueryParameter } = require('../extractQueryParameter')

    const queryParameter = extractQueryParameter()

    expect(queryParameter).toBe(undefined)
  })

  it('returns the query values for key "query" when an array of query parameters for key "query" is supplied', () => {
    jest.mock('@reach/router', () => ({
      createHistory: jest.fn(() => ({
        location: { pathname: 'query=pog&query=champ&query=LUL' },
      })),
    }))

    const { extractQueryParameter } = require('../extractQueryParameter')

    const queryParameter = extractQueryParameter()

    expect(queryParameter).toBe('pog,champ,LUL')
  })

  it('returns an empty string when the pathname with query key "query" is not supplied', () => {
    jest.mock('@reach/router', () => ({
      createHistory: jest.fn(() => ({
        location: { pathname: '/url?query=' },
      })),
    }))

    const { extractQueryParameter } = require('../extractQueryParameter')

    const queryParameter = extractQueryParameter()

    expect(queryParameter).toBe('')
  })

  it('returns the correct query value when the pathname with query key "query" is supplied', () => {
    jest.mock('@reach/router', () => ({
      createHistory: jest.fn(() => ({
        location: { pathname: '/url?query=foobar' },
      })),
    }))

    const { extractQueryParameter } = require('../extractQueryParameter')

    const queryParameter = extractQueryParameter()

    expect(queryParameter).toBe('foobar')
  })
})
