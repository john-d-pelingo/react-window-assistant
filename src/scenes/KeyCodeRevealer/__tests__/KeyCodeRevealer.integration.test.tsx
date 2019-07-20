import {
  fireEvent,
  getByLabelText as rootGetByLabelText,
  render,
} from '@testing-library/react'
import React from 'react'

import { KeyCodeRevealer } from '../KeyCodeRevealer'

describe('scenes - KeyCodeRevealer', () => {
  it('shows the key pressed and changes document title to the corresponding key on key press', () => {
    const { getByLabelText } = render(<KeyCodeRevealer />)

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
    expect(document.title).toBe('13 : enter')
  })

  it('shows the key pressed and changes the document title to an unknown key on an unknown key press', () => {
    const { getByLabelText } = render(<KeyCodeRevealer />)

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
    expect(document.title).toBe('999 : unidentified')
  })

  it('resets view on key press and click of the button', () => {
    const { getByLabelText } = render(<KeyCodeRevealer />)

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
  })
})
