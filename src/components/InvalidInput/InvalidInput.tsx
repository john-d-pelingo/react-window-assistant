import React, { FC } from 'react'

import { useInvalidInputStyles } from './useInvalidInputStyles'

interface IInvalidInputProps {
  children: string
}

export const InvalidInput: FC<IInvalidInputProps> = ({ children }) => {
  const classes = useInvalidInputStyles()

  return (
    <div aria-label="Invalid input" className={classes.invalidInput}>
      <span>{children}</span>
    </div>
  )
}
