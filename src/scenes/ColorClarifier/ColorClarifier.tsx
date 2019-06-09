import { Container, TextField } from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

import { colorClarifierQueryParameter } from 'consants/strings'
import { appendQueryParameter } from 'helpers/appendQueryParameter'
import { extractQueryParameter } from 'helpers/extractQueryParameter'
import { useColor } from 'hooks/userColor'

import { Clarification } from './Clarification'
import { useColorClarifierStyles } from './useColorClarifierStyles'

export const ColorClarifier: FC<RouteComponentProps> = () => {
  const classes = useColorClarifierStyles()
  const colorInputElement = useRef<HTMLInputElement>()
  const [colorText, setColorText] = useState('')

  useEffect(() => {
    if (colorInputElement.current) {
      colorInputElement.current.focus()
    }

    const queryParameter = extractQueryParameter(colorClarifierQueryParameter)

    if (queryParameter) {
      setColorText(queryParameter)
    }
  }, [])

  const handleColorInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = event.target
    setColorText(value)

    try {
      appendQueryParameter(colorClarifierQueryParameter, value)
    } catch (error) {
      appendQueryParameter(colorClarifierQueryParameter, value)
    }
  }

  const color = useColor(colorText.trim())

  return (
    <Container className={classes.container}>
      <TextField
        fullWidth
        inputProps={{
          'aria-label': 'Color to clarify',
        }}
        inputRef={colorInputElement}
        margin="normal"
        onChange={handleColorInputChange}
        placeholder="Color"
        value={colorText}
      />

      {color.current && <Clarification colorInstance={color.current} />}
    </Container>
  )
}
