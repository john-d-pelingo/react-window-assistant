import { Container, TextField } from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import Helmet from 'react-helmet'

import { InvalidInput } from 'components/InvalidInput'
import { colorClarifierQueryParameter } from 'consants/strings'
import { appendQueryParameter } from 'helpers/appendQueryParameter'
import { extractQueryParameter } from 'helpers/extractQueryParameter'
import { useColor } from 'hooks/userColor'

import { Clarification } from './Clarification'

export const ColorClarifier: FC<RouteComponentProps> = () => {
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
    <>
      <Helmet>
        <title>Color Clarifier</title>
      </Helmet>
      <Container maxWidth="xl" style={{ margin: '100px 0' }}>
        <TextField
          fullWidth
          inputProps={{
            'aria-label': 'Color input',
          }}
          inputRef={colorInputElement}
          margin="normal"
          onChange={handleColorInputChange}
          placeholder="Color to clarify"
          value={colorText}
        />

        {color.current ? (
          <Clarification colorInstance={color.current} />
        ) : (
          colorText.trim().length !== 0 && (
            <InvalidInput>Invalid color value!</InvalidInput>
          )
        )}
      </Container>
    </>
  )
}
