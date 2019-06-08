import { appendQueryParameter } from '../appendQueryParameter'

// TODO: fix by not using the `#`
describe.skip('helpers - appendQueryParameter', () => {
  it('appends the query parameter "query" into the hash', () => {
    expect(window.location.hash).toBe('')

    appendQueryParameter('hello-word')

    expect(window.location.hash).toBe('#/url?query=hello-word')
  })
})
