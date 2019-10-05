import { Container, TextField } from '@material-ui/core'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'

import { InvalidInput } from 'components/InvalidInput'
import { colorClarifierQueryParameter } from 'consants/strings'
import { appendQueryParameter } from 'helpers/appendQueryParameter'
import { extractQueryParameter } from 'helpers/extractQueryParameter'

import { Clarification } from './Clarification'
import { useColor } from './useColor'

export const ColorClarifier: FC = () => {
  const colorInputElement = useRef<HTMLInputElement>()
  const [colorText, setColorText] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (colorInputElement.current) {
      colorInputElement.current.focus()
    }

    const queryParameter = extractQueryParameter({
      history,
      key: colorClarifierQueryParameter,
    })

    if (queryParameter) {
      setColorText(queryParameter)
    }
  }, [history])

  const handleColorInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = event.target
    setColorText(value)

    appendQueryParameter({
      history,
      key: colorClarifierQueryParameter,
      value,
    })
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
