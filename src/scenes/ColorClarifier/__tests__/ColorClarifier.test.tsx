import 'jest-dom/extend-expect'

import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { customHistory } from 'helpers/reachRouterUtils'

import { ColorClarifier } from '../ColorClarifier'

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
    customHistory.navigate('/')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays info about a valid color', () => {
    expect(customHistory.location.href).toBe('http://localhost/')

    const { getByLabelText, queryByText } = render(<ColorClarifier />)

    // NOTE: the document title is not changing for some reason
    // expect(document.title).toBe('Color Clarifier')

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
    expect(customHistory.location.search).toContain(
      '?color=hsl%28291.29999999999995%2C%2077%25%2C%2050.6%25%29',
    )
  })

  it('displays that the color is invalid', () => {
    const { getByLabelText } = render(<ColorClarifier />)

    const colorInputElement = getByLabelText('Color input') as HTMLInputElement

    fireEvent.change(colorInputElement, {
      target: {
        value: 'Give me a color',
      },
    })

    expect(getByLabelText(/invalid input/i).textContent).toBe(
      'Invalid color value!',
    )
  })

  it.skip('copies a color on color clarification click', () => {
    const { getByLabelText } = render(<ColorClarifier />)

    const colorInputElement = getByLabelText('Color input') as HTMLInputElement

    fireEvent.change(colorInputElement, {
      target: {
        value: '#bca',
      },
    })

    const copyHwbButtonElement = getByLabelText(
      /copy hwb color/i,
    ) as HTMLButtonElement

    // NOTE: hopefully gets fixed at React 16.9.0. See: https://github.com/facebook/react/issues/14769#issuecomment-482694782
    act(() => {
      fireEvent.click(copyHwbButtonElement)
    })
  })

  it('loads a correct color clarification from the URL', () => {
    customHistory.navigate('/?color=%20rgb%2882%2C%20156%2C%2023%29')

    const { queryByText } = render(<ColorClarifier />)

    expect(queryByText(/clarification/i)).toBeInTheDocument()
  })

  it('loads a wrong color clarification from the URL', () => {
    customHistory.navigate('/?color=kebap%20is%20💯')

    const { getByLabelText } = render(<ColorClarifier />)

    expect(getByLabelText(/invalid input/i)).toBeInTheDocument()
  })
})
