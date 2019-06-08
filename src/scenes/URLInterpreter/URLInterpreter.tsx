import { Container, TextField } from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

import { urlInterpreterQueryParameter } from 'consants/strings'
import { appendQueryParameter } from 'helpers/appendQueryParameter'
import { extractQueryParameter } from 'helpers/extractQueryParameter'

import { Interpretation } from './Interpretation'
import { useUrlInterpreterStyles } from './useUrlInterpreterStyles'

export const URLInterpreter: FC<RouteComponentProps> = () => {
  const classes = useUrlInterpreterStyles()
  const inputNode = useRef<HTMLInputElement>()
  const [urlText, setUrlText] = useState('')
  const [urlInstance, setUrlInstance] = useState<URL | null>()

  useEffect(() => {
    if (inputNode.current) {
      inputNode.current.focus()
    }

    const queryParameter = extractQueryParameter(urlInterpreterQueryParameter)

    if (queryParameter) {
      setUrlText(queryParameter)

      try {
        const newUrlInstance = new URL(queryParameter)
        setUrlInstance(newUrlInstance)
      } catch (error) {
        return
      }
    }
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setUrlText(value)

    try {
      const newUrlInstance = new URL(value)
      setUrlInstance(newUrlInstance)
      appendQueryParameter(newUrlInstance.href)
    } catch (error) {
      appendQueryParameter(value)
      setUrlInstance(null)
    }
  }

  return (
    <Container className={classes.container} maxWidth="xl">
      <TextField
        fullWidth
        inputProps={{
          'aria-label': 'URL input',
        }}
        inputRef={inputNode}
        margin="normal"
        onChange={handleInputChange}
        placeholder="URI to interpret"
        value={urlText}
      />
      {urlInstance && <Interpretation urlInstance={urlInstance} />}
    </Container>
  )
}
