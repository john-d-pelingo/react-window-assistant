import 'jest-styled-components'

import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { Header } from '../Header'

let memoryHistory = createMemoryHistory()

describe('components - Header', () => {
  beforeEach(() => {
    memoryHistory = createMemoryHistory()
  })

  it('mounts', () => {
    expect(memoryHistory.location.pathname).toBe('/')

    const { container } = render(
      <Router history={memoryHistory}>
        <Header />
      </Router>,
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  // TODO: add test for each active link by using aria-label or text
})
