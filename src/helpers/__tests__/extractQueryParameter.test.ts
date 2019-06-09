import { globalHistory } from '@reach/router'

import {
  colorClarifierQueryParameter,
  urlInterpreterQueryParameter,
} from '../../consants/strings'
import { extractQueryParameter } from '../extractQueryParameter'

afterAll(() => {
  globalHistory.location.search = ''
})

// TODO: read "refactor to use my own history"
describe('helpers - extractQueryParameter', () => {
  it('returns undefined when there is no query parameter', () => {
    const queryParameter = extractQueryParameter(urlInterpreterQueryParameter)

    expect(queryParameter).toBeUndefined()
  })

  it('returns undefined when the query key "query" is not supplied', () => {
    globalHistory.location.search = '?theKey=123'

    const queryParameter = extractQueryParameter(urlInterpreterQueryParameter)

    expect(queryParameter).toBeUndefined()
  })

  it('returns the query values for key "query" when an array of query parameters for key "query" is supplied', () => {
    globalHistory.location.search = '?url=pog&url=champ&url=LUL'

    const queryParameter = extractQueryParameter(urlInterpreterQueryParameter)

    expect(queryParameter).toBe('pog,champ,LUL')
  })

  it('returns an empty string when the pathname with query key "query" is not supplied', () => {
    globalHistory.location.search = '?url='

    const queryParameter = extractQueryParameter(urlInterpreterQueryParameter)

    expect(queryParameter).toBe('')
  })

  it('returns the correct query value when the pathname with query key "query" is supplied', () => {
    globalHistory.location.search = '?color=fooboo'

    const queryParameter = extractQueryParameter(colorClarifierQueryParameter)

    expect(queryParameter).toBe('fooboo')
  })
})
