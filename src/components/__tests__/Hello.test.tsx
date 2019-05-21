import React from 'react'
import { render } from 'react-testing-library'

import { Hello } from '../Hello'

describe('components - Hello', () => {
  it('mounts', () => {
    const { getByLabelText } = render(<Hello />)

    const element = getByLabelText('hello-world')

    expect(element.textContent).toMatch(/hello world/i)
  })
})
