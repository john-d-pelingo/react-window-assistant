import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import {
  fireEvent,
  getByLabelText as rootGetByLabelText,
  render,
} from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Router } from 'react-router-dom'

import { KeyCodeRevealer } from '../KeyCodeRevealer'

let memoryHistory = createMemoryHistory()

describe('scenes - KeyCodeRevealer', () => {
  beforeEach(() => {
    memoryHistory = createMemoryHistory()
  })

  it('mounts', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { container } = render(
      <Router history={memoryHistory}>
        <KeyCodeRevealer />
      </Router>,
    )

    expect(Helmet.peek().title).toBe('Key Code Revealer')
    expect(container.firstChild).toMatchSnapshot()
  })

  it('shows the key pressed and changes document title to the corresponding key on key press', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { getByLabelText } = render(
      <Router history={memoryHistory}>
        <KeyCodeRevealer />
      </Router>,
    )

    const appElement = getByLabelText('key-code-app') as HTMLDivElement

    fireEvent.keyDown(appElement, {
      keyCode: 13,
    })

    const keyCodeNumberElement = getByLabelText(
      'key-code-number',
    ) as HTMLSpanElement
    const keyCodeButtonElement = getByLabelText(
      'key-code-button',
    ) as HTMLSpanElement

    expect(keyCodeNumberElement.textContent).toBe('13')
    expect(keyCodeButtonElement.textContent).toBe('enter')
    expect(Helmet.peek().title).toBe('13 : enter')
    expect(memoryHistory.location.search).toBe('?key=13')

    fireEvent.keyDown(appElement, {
      keyCode: 187,
    })

    expect(keyCodeNumberElement.textContent).toBe('187')
    expect(keyCodeButtonElement.textContent).toBe('equal sign')
    expect(Helmet.peek().title).toBe('187 : equal sign')
    expect(memoryHistory.location.search).toBe('?key=187')
  })

  it('shows the key pressed and changes the document title to an unknown key on an unknown key press', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { getByLabelText } = render(
      <Router history={memoryHistory}>
        <KeyCodeRevealer />
      </Router>,
    )

    const appElement = getByLabelText('key-code-app')

    fireEvent.keyDown(appElement, {
      keyCode: 999,
    })

    const keyCodeNumberElement = getByLabelText(
      'key-code-number',
    ) as HTMLSpanElement
    const keyCodeButtonElement = getByLabelText(
      'key-code-button',
    ) as HTMLSpanElement

    expect(keyCodeNumberElement.textContent).toBe('999')
    expect(keyCodeButtonElement.textContent).toBe('unidentified')
    expect(Helmet.peek().title).toBe('999 : unidentified')
    expect(memoryHistory.location.search).toBe('?key=999')
  })

  it('resets view on key press and click of the button', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { getByLabelText } = render(
      <Router history={memoryHistory}>
        <KeyCodeRevealer />
      </Router>,
    )

    const appElement = getByLabelText('key-code-app')

    expect(appElement.textContent).toMatch(/press a key/i)

    fireEvent.keyDown(appElement, {
      keyCode: 18,
    })

    expect(appElement.textContent).toMatch(/^\d/)
    expect(appElement.textContent).toMatch(/alt/i)
    expect(appElement.textContent).not.toMatch(/press a key/i)

    const keyCodeButtonElement = rootGetByLabelText(
      appElement,
      'key-code-button',
    )

    fireEvent.click(keyCodeButtonElement)

    expect(appElement.textContent).toMatch(/press a key/i)
    expect(Helmet.peek().title).toBe('Key Code Revealer')
    expect(memoryHistory.location.search).toBe('?')
  })

  it('loads a correct key from the URL', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    memoryHistory.push('?key=82')

    const { getByLabelText } = render(
      <Router history={memoryHistory}>
        <KeyCodeRevealer />
      </Router>,
    )

    expect(getByLabelText(/key-code-button/i)).toHaveTextContent('r')
  })

  it('loads a wrong key from the URL', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    memoryHistory.push('?key=fake-key-code')

    const { getByLabelText } = render(
      <Router history={memoryHistory}>
        <KeyCodeRevealer />
      </Router>,
    )

    expect(getByLabelText(/key-code-number/i)).toHaveTextContent('!=Num')
    expect(getByLabelText(/key-code-button/i)).toHaveTextContent(
      'What key code is that?',
    )
    expect(memoryHistory.location.search).toBe('?key=NaN')
  })
})
