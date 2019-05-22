import { ErrorInfo } from 'react'

export const reporter = {
  report(error: Error, errorInfo: ErrorInfo) {
    console.error(`>> ${error.message}`, errorInfo)
  },
}
