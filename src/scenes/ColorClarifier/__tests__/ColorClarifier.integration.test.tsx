import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Router } from 'react-router-dom'

import { ColorClarifier } from '../ColorClarifier'

let memoryHistory = createMemoryHistory()

describe('scenes - ColorClarifier', () => {
  beforeEach(() => {
    // NOTE: for the 'copies a color on color clarification click' test
    document.createRange = () => ({
      // @ts-ignore
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
      },
      setEnd: () => undefined,
      setStart: () => undefined,
    })

    document.getSelection = jest.fn()
    document.execCommand = jest.fn()
    memoryHistory = createMemoryHistory()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('mounts', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { container } = render(
      <Router history={memoryHistory}>
        <ColorClarifier />
      </Router>,
    )

    expect(Helmet.peek().title).toBe('Color Clarifier')
    expect(container.firstChild).toMatchSnapshot()
  })

  it('displays info about a valid color', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { getByLabelText, queryByText } = render(
      <Router history={memoryHistory}>
        <ColorClarifier />
      </Router>,
    )

    const colorInputElement = getByLabelText('Color input') as HTMLInputElement

    expect(document.activeElement).toEqual(colorInputElement)

    fireEvent.change(colorInputElement, {
      target: {
        value: 'hsl(291.29999999999995, 77%, 50.6%)',
      },
    })

    expect(colorInputElement.value).toBe('hsl(291.29999999999995, 77%, 50.6%)')
    expect(queryByText(/clarification/i)).toBeInTheDocument()
    expect(getByLabelText('RGB color').textContent).toBe('rgb(198, 32, 226)')
    expect(getByLabelText('Hex color').textContent).toBe('#c620e2')
    expect(getByLabelText('HSL color').textContent).toBe(
      'hsl(291.29999999999995, 77%, 50.6%)',
    )
    expect(getByLabelText('HWB color').textContent).toBe(
      'hwb(291.29999999999995, 12.6%, 11.4%)',
    )
    expect(memoryHistory.location.search).toBe(
      '?color=hsl%28291.29999999999995%2C%2077%25%2C%2050.6%25%29',
    )
  })

  it('displays that the color is invalid', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { getByLabelText } = render(
      <Router history={memoryHistory}>
        <ColorClarifier />
      </Router>,
    )

    const colorInputElement = getByLabelText('Color input') as HTMLInputElement

    fireEvent.change(colorInputElement, {
      target: {
        value: 'Give me a color',
      },
    })

    expect(getByLabelText(/invalid input/i).textContent).toBe(
      'Invalid color value!',
    )
    expect(memoryHistory.location.search).toBe('?color=Give%20me%20a%20color')
  })

  it('copies a color on color clarification click', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { getByLabelText, getByText } = render(
      <Router history={memoryHistory}>
        <ColorClarifier />
      </Router>,
    )

    const colorInputElement = getByLabelText('Color input') as HTMLInputElement

    fireEvent.change(colorInputElement, {
      target: {
        value: '#bca',
      },
    })

    const copyHwbButtonElement = getByLabelText(
      /copy hwb color/i,
    ) as HTMLButtonElement

    fireEvent.click(copyHwbButtonElement)

    const copiedTooltip = getByText(/copied!/i) as HTMLDivElement

    expect(copiedTooltip).toBeInTheDocument()
  })

  it('loads a correct color clarification from the URL', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    memoryHistory.push('?color=%20rgb%2882%2C%20156%2C%2023%29')

    const { queryByText } = render(
      <Router history={memoryHistory}>
        <ColorClarifier />
      </Router>,
    )

    expect(queryByText(/clarification/i)).toBeInTheDocument()
  })

  it('loads a wrong color clarification from the URL', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    memoryHistory.push('?color=kebap%20is%20💯')

    const { getByLabelText } = render(
      <Router history={memoryHistory}>
        <ColorClarifier />
      </Router>,
    )

    expect(getByLabelText(/invalid input/i)).toBeInTheDocument()
  })
})
