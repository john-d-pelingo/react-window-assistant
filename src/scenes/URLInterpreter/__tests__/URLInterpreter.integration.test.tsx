import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Router } from 'react-router-dom'

import { URLInterpreter } from '../URLInterpreter'

let memoryHistory = createMemoryHistory()

describe('scenes - URLInterpreter', () => {
  beforeEach(() => {
    memoryHistory = createMemoryHistory()
  })

  it('mounts', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { container } = render(
      <Router history={memoryHistory}>
        <URLInterpreter />
      </Router>,
    )

    expect(Helmet.peek().title).toBe('URL Interpreter')
    expect(container.firstChild).toMatchSnapshot()
  })

  it('displays info about a valid URL', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { getByLabelText, getByText, queryByText } = render(
      <Router history={memoryHistory}>
        <URLInterpreter />
      </Router>,
    )

    const urlInputElement = getByLabelText('URL input') as HTMLInputElement

    expect(document.activeElement).toEqual(urlInputElement)

    fireEvent.change(urlInputElement, {
      target: {
        value:
          'https://facebook.github.io:420/create-react-app/docs/using-the-public-folder?query=1&query=65&gg=0#docsNav',
      },
    })

    expect(urlInputElement.value).toBe(
      'https://facebook.github.io:420/create-react-app/docs/using-the-public-folder?query=1&query=65&gg=0#docsNav',
    )
    expect(queryByText(/interpretation/i)).toBeInTheDocument()
    expect(getByText('Origin').nextSibling!.textContent).toBe(
      'https://facebook.github.io:420',
    )
    expect(
      getByText('Encoded Hypertext REFerence').nextSibling!.textContent,
    ).toBe(
      'https%3A%2F%2Ffacebook.github.io%3A420%2Fcreate-react-app%2Fdocs%2Fusing-the-public-folder%3Fquery%3D1%26query%3D65%26gg%3D0%23docsNav',
    )
    expect(getByText('Pathname').nextSibling!.textContent).toBe(
      '/create-react-app/docs/using-the-public-folder',
    )
    expect(getByText('Hash').nextSibling!.textContent).toBe('#docsNav')
    expect(getByText('Port').nextSibling!.textContent).toBe('420')
    expect(getByText('Search').nextSibling!.textContent).toBe(
      '?query=1&query=65&gg=0',
    )
    expect(queryByText(/search parameters/i)).toBeInTheDocument()
    expect(getByText('query').nextSibling!.textContent).toBe('1,65')
    expect(memoryHistory.location.search).toBe(
      '?url=https%3A%2F%2Ffacebook.github.io%3A420%2Fcreate-react-app%2Fdocs%2Fusing-the-public-folder%3Fquery%3D1%26query%3D65%26gg%3D0%23docsNav',
    )
  })

  it("doesn't display info about an invalid URL", () => {
    expect(memoryHistory.location.pathname).toBe('/')
    const { getByLabelText, queryByText } = render(
      <Router history={memoryHistory}>
        <URLInterpreter />
      </Router>,
    )

    const urlInputElement = getByLabelText('URL input') as HTMLInputElement

    fireEvent.change(urlInputElement, {
      target: {
        value: "What's)this!U+R>L%(_[≥æ™‘«¢“∞æ™æ¡",
      },
    })

    expect(urlInputElement.value).toBe("What's)this!U+R>L%(_[≥æ™‘«¢“∞æ™æ¡")

    expect(queryByText(/interpretation/i)).not.toBeInTheDocument()
    expect(getByLabelText(/invalid input/i).textContent).toBe(
      'Invalid URL value!',
    )
    expect(memoryHistory.location.search).toBe(
      '?url=What%27s%29this%21U%2BR%3EL%25%28_%5B%E2%89%A5%C3%A6%E2%84%A2%E2%80%98%C2%AB%C2%A2%E2%80%9C%E2%88%9E%C3%A6%E2%84%A2%C3%A6%C2%A1',
    )
  })

  // TODO: add test for URI file:/react/_mine/react-window-assistant/src/scenes/URIInterpreter/__tests__/URIInterpreter.integration.test.tsx

  it('loads a correct URL interpretation from the URL', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    memoryHistory.push('?url=http%3A%2F%2Fgoogle.lul%2F')

    const { queryByText } = render(
      <Router history={memoryHistory}>
        <URLInterpreter />
      </Router>,
    )

    expect(queryByText(/interpretation/i)).toBeInTheDocument()
  })

  it('loads a wrong URL clarification from the URL', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    memoryHistory.push('?url=give%20me%20🥙%20and%20🥙')

    const { getByLabelText } = render(
      <Router history={memoryHistory}>
        <URLInterpreter />
      </Router>,
    )

    expect(getByLabelText(/invalid input/i)).toBeInTheDocument()
  })
})
