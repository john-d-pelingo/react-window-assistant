import 'jest-dom/extend-expect'

import { globalHistory } from '@reach/router'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { URLInterpreter } from '../URLInterpreter'

// TODO: refactor to use my own history e.g. https://reach.tech/router/api/createHistory
// instead of `globalHistory`. Use the created `history` object with `LocationProvider`.
// And then when the `history` object is needed, import it from the file that creates
// the new `history` object. Pass that object to functions that require it.

describe.skip('scenes - URLInterpreter', () => {
  it('displays info about a valid URL', () => {
    expect(globalHistory.location.href).toBe('http://localhost/')

    const { getByLabelText, getByText, queryByText } = render(
      <URLInterpreter />,
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

    expect(globalHistory.location.search).toContain(
      '?url=https%3A%2F%2Ffacebook.github.io%3A420%2Fcreate-react-app%2Fdocs%2Fusing-the-public-folder%3Fquery%3D1%26query%3D65%26gg%3D0%23docsNav',
    )
  })

  it("doesn't display info about an invalid URL", () => {
    expect(globalHistory.location.href).toBe('http://localhost/')

    const { getByLabelText, queryByText } = render(<URLInterpreter />)

    const urlInputElement = getByLabelText('URL input') as HTMLInputElement

    fireEvent.change(urlInputElement, {
      target: {
        value: "What's)this!U+R>L%(_[≥æ™‘«¢“∞æ™æ¡",
      },
    })

    expect(urlInputElement.value).toBe("What's)this!U+R>L%(_[≥æ™‘«¢“∞æ™æ¡")

    expect(queryByText(/interpretation/i)).not.toBeInTheDocument()
    expect(window.location.href).toContain(
      '?query=What%27s%29this%21U%2BR%3EL%25%28_%5B%E2%89%A5%C3%A6%E2%84%A2%E2%80%98%C2%AB%C2%A2%E2%80%9C%E2%88%9E%C3%A6%E2%84%A2%C3%A6%C2%A1',
    )
  })
})
