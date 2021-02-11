import { ErrorInfo } from 'react'

export const reporter = {
  report(error: Error, errorInfo: ErrorInfo): void {
    console.error(`>> ${error.message}`, errorInfo)
  },
}
