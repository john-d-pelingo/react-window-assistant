import { Container, TextField } from '@material-ui/core'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'

import { InvalidInput } from 'components/InvalidInput'
import { colorClarifierQueryParameter } from 'consants/strings'
import { extractQueryParameter } from 'helpers/extractQueryParameter'
import { useQueryParameterComputation } from 'hooks/useQueryParameterComputation'

import { Clarification } from './Clarification'
import { useColor } from './useColor'

export const ColorClarifier: FC = () => {
  const colorInputElement = useRef<HTMLInputElement>()
  const [colorText, setColorText] = useState<string | undefined>(undefined)

  const history = useHistory()
  useQueryParameterComputation({
    history,
    key: colorClarifierQueryParameter,
    value: colorText,
  })

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

  const color = useColor(colorText ? colorText.trim() : '')

  const handleColorInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = event.target
    setColorText(value)
  }

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
          value={colorText ? colorText : ''}
        />

        {color.current ? (
          <Clarification colorInstance={color.current} />
        ) : (
          colorText &&
          colorText.trim().length !== 0 && (
            <InvalidInput>Invalid color value!</InvalidInput>
          )
        )}
      </Container>
    </>
  )
}
