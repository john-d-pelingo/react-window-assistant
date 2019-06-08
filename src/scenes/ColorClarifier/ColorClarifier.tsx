import { Container } from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import React, { ChangeEvent, FC, useState } from 'react'

import { useColor } from 'hooks/userColor'

import { Clarification } from './Clarification'
import { useColorClarifierStyles } from './useColorClarifierStyles'

export const ColorClarifier: FC<RouteComponentProps> = () => {
  const classes = useColorClarifierStyles()
  const [colorText, setColorText] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setColorText(event.target.value)
  }

  const color = useColor(colorText.trim())

  return (
    <Container className={classes.container}>
      <input onChange={handleInputChange} type="text" value={colorText} />

      {/* TODO: append color query parameter on typing by reusing the function `appendQueryParameter` */}
      {color.current && <Clarification color={color.current} />}
    </Container>
  )
}
