import { RouteComponentProps } from '@reach/router'
import { Container, TextField } from '@material-ui/core'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

import { appendQueryParameter } from 'helpers/appendQueryParameter'
import { extractQueryParameter } from 'helpers/extractQueryParameter'

import { useUrlInterpreterStyles } from './useUrlInterpreterStyles'
import { Interpretation } from './Interpretation'

interface IURLInterpreterProps extends RouteComponentProps {}

export const URLInterpreter: FC<IURLInterpreterProps> = () => {
  const classes = useUrlInterpreterStyles()
  const inputNode = useRef<HTMLInputElement>()
  const [urlText, setUrlText] = useState('')
  const [urlInstance, setUrlInstance] = useState<URL | null>()

  useEffect(() => {
    if (inputNode.current) {
      inputNode.current.focus()
    }

    const queryParameter = extractQueryParameter()

    if (queryParameter) {
      setUrlText(queryParameter)

      try {
        const newUrlInstance = new URL(queryParameter)
        setUrlInstance(newUrlInstance)
      } catch (error) {}
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
    <Container className={classes.container}>
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
