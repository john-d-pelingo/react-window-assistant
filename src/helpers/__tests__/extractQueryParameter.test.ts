import { createMemoryHistory } from 'history'

import {
  colorClarifierQueryParameter,
  urlInterpreterQueryParameter,
} from 'consants/strings'

import { extractQueryParameter } from '../extractQueryParameter'

let memoryHistory = createMemoryHistory()

describe('helpers - extractQueryParameter', () => {
  // NOTE: this makes sure that we're back to the original URL for every test case
  beforeEach(() => {
    memoryHistory = createMemoryHistory()
  })

  it('returns undefined when there is no query parameter', () => {
    const queryParameter = extractQueryParameter({
      history: memoryHistory,
      key: urlInterpreterQueryParameter,
    })

    expect(queryParameter).toBeUndefined()
  })

  it('returns undefined when the query key "query" is not supplied', () => {
    memoryHistory.push('?theKey=123')

    const queryParameter = extractQueryParameter({
      history: memoryHistory,
      key: urlInterpreterQueryParameter,
    })

    expect(queryParameter).toBeUndefined()
  })

  it('returns the query values for key "query" when an array of query parameters for key "query" is supplied', () => {
    memoryHistory.push('?url=pog&url=champ&url=LUL')

    const queryParameter = extractQueryParameter({
      history: memoryHistory,
      key: urlInterpreterQueryParameter,
    })

    expect(queryParameter).toBe('pog,champ,LUL')
  })

  it('returns an empty string when the pathname with query key "query" is not supplied', () => {
    memoryHistory.push('?url=')

    const queryParameter = extractQueryParameter({
      history: memoryHistory,
      key: urlInterpreterQueryParameter,
    })

    expect(queryParameter).toBe('')
  })

  it('returns the correct query value when the pathname with query key "query" is supplied', () => {
    memoryHistory.location.search = '?color=fooboo'

    const queryParameter = extractQueryParameter({
      history: memoryHistory,
      key: colorClarifierQueryParameter,
    })

    expect(queryParameter).toBe('fooboo')
  })
})
