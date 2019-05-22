import React, { Component, ErrorInfo } from 'react'

interface IErrorBoundaryState {
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<{}, IErrorBoundaryState> {
  state = {
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // NOTE: Catch errors in any child components and re-renders with an error message
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const { error, errorInfo } = this.state

    if (error) {
      // NOTE: Fallback UI if an error occurs
      return (
        <div
          style={{
            color: '#fe5252',
            fontWeight: 'bold',
          }}
        >
          <h2>Oh-no! Something went wrong</h2>
          <p className="red">{(error as Error).toString()}</p>
          <div>Component Stack Error Details: </div>
          <p className="red">
            {errorInfo && (errorInfo as ErrorInfo).componentStack}
          </p>
        </div>
      )
    }

    // NOTE: Component normally just renders children
    return this.props.children
  }
}
