import 'jest-dom/extend-expect'

import React from 'react'
import { fireEvent, render } from 'react-testing-library'

import { JSONSorter } from '../JSONSorter'

describe('scenes - JSONSorter', () => {
  beforeEach(() => {
    document.getSelection = jest.fn()
    document.execCommand = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('allows user to click sort but not copy when the json is invalid', () => {
    const { getByLabelText, getByText, queryByText } = render(<JSONSorter />)

    const jsonInputElement = getByLabelText('JSON input') as HTMLInputElement

    expect(document.activeElement).toEqual(jsonInputElement)

    const copyButtonElement = getByLabelText('Copy button') as HTMLButtonElement
    const sortButtonElement = getByLabelText('Sort button') as HTMLButtonElement

    expect(copyButtonElement.disabled).toBe(true)
    expect(sortButtonElement.disabled).toBe(true)

    fireEvent.change(jsonInputElement, {
      target: {
        value: 'bad json',
      },
    })

    expect(jsonInputElement).toHaveTextContent('bad json')
    expect(copyButtonElement.disabled).toBe(true)
    expect(sortButtonElement.disabled).toBe(false)

    expect(queryByText('Invalid JSON!')).not.toBeInTheDocument()

    fireEvent.click(sortButtonElement)

    const errorNotificationElement = getByText('Invalid JSON!')

    expect(errorNotificationElement).toBeInTheDocument()
  })

  it('copies the json when the user clicks sort and copy', () => {
    const { getByLabelText, queryByText } = render(<JSONSorter />)

    const jsonInputElement = getByLabelText('JSON input') as HTMLInputElement
    const copyButtonElement = getByLabelText('Copy button') as HTMLButtonElement
    const sortButtonElement = getByLabelText('Sort button') as HTMLButtonElement

    fireEvent.change(jsonInputElement, {
      target: {
        value: '{"z":2,"y":0,"m":{"gg":42,"become":"you"},"p":1}',
      },
    })

    expect(jsonInputElement).toHaveTextContent(
      '{"z":2,"y":0,"m":{"gg":42,"become":"you"},"p":1}',
    )
    expect(copyButtonElement.disabled).toBe(false)
    expect(sortButtonElement.disabled).toBe(false)

    fireEvent.click(sortButtonElement)

    expect(queryByText('Invalid JSON!')).not.toBeInTheDocument()
    expect(jsonInputElement).toHaveTextContent(
      '{ "m": { "gg": 42, "become": "you" }, "p": 1, "y": 0, "z": 2 }',
    )

    fireEvent.click(copyButtonElement)

    expect(queryByText('Copied JSON!')).toBeInTheDocument()
  })

  it('does not sort the JSON input when it is invalid and user presses ctrl-enter and cmd-center', () => {
    const { getByLabelText, queryByText } = render(<JSONSorter />)

    const jsonInputElement = getByLabelText('JSON input') as HTMLInputElement

    fireEvent.change(jsonInputElement, {
      target: {
        value: 'nemesis',
      },
    })

    fireEvent.keyDown(jsonInputElement, {
      ctrlKey: true,
      keyCode: 13,
    })

    expect(queryByText('Invalid JSON!')).toBeInTheDocument()

    const closeErrorNotificationElement = getByLabelText(
      'Close error notification',
    )

    fireEvent.click(closeErrorNotificationElement)
  })

  it('does not sort the JSON input when it is invalid and user presses ctrl-enter', () => {
    const { getByLabelText, queryByText } = render(<JSONSorter />)

    const jsonInputElement = getByLabelText('JSON input') as HTMLInputElement

    fireEvent.change(jsonInputElement, {
      target: {
        value: 'Am I valid?',
      },
    })

    fireEvent.keyDown(jsonInputElement, {
      ctrlKey: true,
      keyCode: 13,
    })

    expect(queryByText('Invalid JSON!')).toBeInTheDocument()

    const closeErrorNotificationElement = getByLabelText(
      'Close error notification',
    )

    fireEvent.click(closeErrorNotificationElement)
  })

  it('does not sort the JSON input when it is invalid and user presses ctrl-enter', () => {
    const { getByLabelText, queryByText } = render(<JSONSorter />)

    const jsonInputElement = getByLabelText('JSON input') as HTMLInputElement

    fireEvent.change(jsonInputElement, {
      target: {
        value: 'Not really ...',
      },
    })

    fireEvent.keyDown(jsonInputElement, {
      metaKey: true,
      keyCode: 10,
    })

    expect(queryByText('Invalid JSON!')).toBeInTheDocument()

    const closeErrorNotificationElement = getByLabelText(
      'Close error notification',
    )

    fireEvent.click(closeErrorNotificationElement)
  })

  it('sorts the JSON input when it valid and user presses ctrl-enter', () => {
    const { getByLabelText } = render(<JSONSorter />)

    const jsonInputElement = getByLabelText('JSON input') as HTMLInputElement

    fireEvent.change(jsonInputElement, {
      target: {
        value: '{"l": 4,            ".": [2, 3], "j": "k"}',
      },
    })

    fireEvent.keyDown(jsonInputElement, {
      metaKey: true,
      keyCode: 10,
    })

    expect(jsonInputElement.textContent).toBe(
      '{\n' +
        '  ".": [\n' +
        '    2,\n' +
        '    3\n' +
        '  ],\n' +
        '  "j": "k",\n' +
        '  "l": 4\n' +
        '}\n',
    )
  })
})
