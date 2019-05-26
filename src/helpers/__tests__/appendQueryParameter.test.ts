import { appendQueryParameter } from '../appendQueryParameter'

describe('helpers - appendQueryParameter', () => {
  it('appends the query parameter "query" into the hash', () => {
    expect(window.location.hash).toBe('')

    appendQueryParameter('hello-word')

    expect(window.location.hash).toBe('#/url?query=hello-word')
  })
})
