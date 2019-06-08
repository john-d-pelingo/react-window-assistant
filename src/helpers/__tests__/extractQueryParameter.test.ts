import { globalHistory } from '@reach/router'

import { urlInterpreterQueryParameter } from '../../consants/strings'
import { extractQueryParameter } from '../extractQueryParameter'

afterAll(() => {
  globalHistory.location.search = ''
})

describe('helpers - extractQueryParameter', () => {
  it('returns null when the pathname is "/"', () => {
    const queryParameter = extractQueryParameter(urlInterpreterQueryParameter)

    expect(queryParameter).toBeUndefined()
  })

  it('returns undefined when the query key "query" is not supplied', () => {
    globalHistory.location.search = '?theKey=123'

    const queryParameter = extractQueryParameter(urlInterpreterQueryParameter)

    expect(queryParameter).toBeUndefined()
  })

  it('returns the query values for key "query" when an array of query parameters for key "query" is supplied', () => {
    globalHistory.location.search = '?query=pog&query=champ&query=LUL'

    const queryParameter = extractQueryParameter(urlInterpreterQueryParameter)

    expect(queryParameter).toBe('pog,champ,LUL')
  })

  it('returns an empty string when the pathname with query key "query" is not supplied', () => {
    globalHistory.location.search = '?query='

    const queryParameter = extractQueryParameter(urlInterpreterQueryParameter)

    expect(queryParameter).toBe('')
  })

  it('returns the correct query value when the pathname with query key "query" is supplied', () => {
    globalHistory.location.search = '?query=fooboo'

    const queryParameter = extractQueryParameter(urlInterpreterQueryParameter)

    expect(queryParameter).toBe('fooboo')
  })
})
