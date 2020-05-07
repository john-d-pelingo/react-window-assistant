/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom/extend-expect'

import { render } from '@testing-library/react'
import React, { FC } from 'react'

import { reporter as mockedReporter } from '../../helpers/reporter'
import { ErrorBoundary } from '../ErrorBoundary'

jest.mock('../../helpers/reporter', () => ({
  reporter: {
    report: jest.fn(),
  },
}))

const Thrower: FC<{ shouldThrow?: boolean }> = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('💣')
  }

  return <div>I didn&apos;t throw after all</div>
}

describe('components - ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn())
  })

  afterEach(() => {
    // eslint-disable-next-line no-extra-semi
    ;(console.error as any).mockRestore()
    ;(mockedReporter.report as any).mockClear()
  })

  it(`mounts successfully when there isn't a problem`, () => {
    const { container } = render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>,
    )

    expect(container).toHaveTextContent("I didn't throw after all")
    expect(mockedReporter.report).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledTimes(0)
  })

  it(`calls report when there's a problem`, () => {
    const { container, rerender } = render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>,
    )
    rerender(
      <ErrorBoundary>
        <Thrower shouldThrow />
      </ErrorBoundary>,
    )

    expect(mockedReporter.report).toHaveBeenCalledTimes(1)
    const error = expect.any(Error)
    const errorInfo = {
      componentStack: expect.stringContaining('Thrower'),
    }
    expect(mockedReporter.report).toHaveBeenCalledWith(error, errorInfo)
    expect(container).toHaveTextContent('Oh-no! Something went wrong')
    expect(console.error).toHaveBeenCalledTimes(2)
  })
})
