import React, { FC } from 'react'
import styled from 'styled-components'

const InvalidInputContainer = styled.div`
  margin-top: 24px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 24px;
`

interface InvalidInputProps {
  children: string
}

export const InvalidInput: FC<InvalidInputProps> = ({ children }) => (
  <InvalidInputContainer aria-label="Invalid input">
    <span>{children}</span>
  </InvalidInputContainer>
)
